import { useCallback, useEffect, useMemo, useState } from 'react';
import type { AnswerRecord, DomainId, ProgressState, QuizConfig, View } from '@/types';
import { DOMAINS } from '@/data/domains';
import { QUESTIONS, allQuestionIds, questionsForDomain } from '@/data/questions';
import {
  applyAnswer,
  computeStats,
  loadProgress,
  loadTheme,
  resetProgress,
  saveProgress,
  saveTheme,
} from '@/lib/storage';
import { burstConfetti, masteryConfetti, smallConfetti } from '@/lib/confetti';

import Navbar from '@/components/Navbar';
import Dashboard from '@/components/Dashboard';
import QuizView from '@/components/QuizView';
import ResultsScreen from '@/components/ResultsScreen';
import Flashcards from '@/components/Flashcards';
import MasteryToast from '@/components/MasteryToast';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FULL_EXAM_COUNT = 15; // a focused full-exam simulation

export default function App() {
  // ── Persistent state ──────────────────────────────────────────────
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => loadTheme());

  // ── View / quiz state ─────────────────────────────────────────────
  const [view, setView] = useState<View>('dashboard');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [sessionAnswers, setSessionAnswers] = useState<AnswerRecord[]>([]);
  const [pendingMastery, setPendingMastery] = useState<DomainId[]>([]);

  // ── Persist progress + theme ──────────────────────────────────────
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveTheme(theme);
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  // ── Derived stats ─────────────────────────────────────────────────
  const stats = useMemo(() => computeStats(progress), [progress]);

  // ── Quiz orchestration ────────────────────────────────────────────
  const startDomainQuiz = useCallback((domainId: DomainId) => {
    const ids = shuffle(questionsForDomain(domainId).map((q) => q.id));
    setQuizConfig({ mode: 'domain', domainId, questionIds: ids });
    setQuizIndex(0);
    setSessionAnswers([]);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const startFullExam = useCallback(() => {
    const ids = shuffle(allQuestionIds()).slice(0, Math.min(FULL_EXAM_COUNT, QUESTIONS.length));
    setQuizConfig({ mode: 'full', questionIds: ids });
    setQuizIndex(0);
    setSessionAnswers([]);
    setView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleAnswer = useCallback(
    (selectedIndex: number, correct: boolean) => {
      const q = quizConfig ? QUESTIONS.find((x) => x.id === quizConfig.questionIds[quizIndex]) : null;
      if (!q) return;
      const record: AnswerRecord = {
        questionId: q.id,
        selectedIndex,
        correct,
        domainId: q.domainId,
        subtopicId: q.subtopicId,
        timestamp: Date.now(),
      };
      setSessionAnswers((prev) => [...prev, record]);
      const { state: nextProgress, newMastery } = applyAnswer(progress, record);
      setProgress(nextProgress);
      if (newMastery.length > 0) {
        setPendingMastery(newMastery);
        masteryConfetti();
      } else if (correct) {
        smallConfetti();
      }
    },
    [quizConfig, quizIndex, progress],
  );

  const handleAdvance = useCallback(() => {
    if (!quizConfig) return;
    const next = quizIndex + 1;
    if (next >= quizConfig.questionIds.length) {
      setView('results');
      burstConfetti();
    } else {
      setQuizIndex(next);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [quizConfig, quizIndex]);

  const handleRetry = useCallback(() => {
    if (!quizConfig) return;
    if (quizConfig.mode === 'domain' && quizConfig.domainId) {
      startDomainQuiz(quizConfig.domainId);
    } else {
      startFullExam();
    }
  }, [quizConfig, startDomainQuiz, startFullExam]);

  const handleExitQuiz = useCallback(() => {
    setView('dashboard');
    setQuizConfig(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleResetAll = useCallback(() => {
    if (typeof window !== 'undefined') {
      const ok = window.confirm(
        'Reset all progress, streaks, and mastery badges? This cannot be undone.',
      );
      if (!ok) return;
    }
    setProgress(resetProgress());
    setView('dashboard');
  }, []);

  const correctSoFar = sessionAnswers.filter((a) => a.correct).length;

  // ── Render ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        stats={stats}
        onGoHome={handleExitQuiz}
        onOpenFlashcards={() => { setView('flashcards'); window.scrollTo({ top: 0 }); }}
      />

      <main>
        {view === 'dashboard' && (
          <Dashboard
            stats={stats}
            masteredDomainIds={progress.masteredDomainIds}
            onStartDomain={startDomainQuiz}
            onStartFull={startFullExam}
            onOpenFlashcards={() => { setView('flashcards'); window.scrollTo({ top: 0 }); }}
          />
        )}

        {view === 'quiz' && quizConfig && (
          <QuizView
            config={quizConfig}
            current={quizIndex}
            streak={progress.currentStreak}
            correctSoFar={correctSoFar}
            sessionAnswers={sessionAnswers}
            onAnswer={handleAnswer}
            onAdvance={handleAdvance}
            onExit={handleExitQuiz}
          />
        )}

        {view === 'results' && (
          <ResultsScreen
            sessionAnswers={sessionAnswers}
            overallStats={stats}
            onRetry={handleRetry}
            onHome={handleExitQuiz}
          />
        )}

        {view === 'flashcards' && (
          <Flashcards
            reviewedIds={progress.flashcardsReviewed}
            onReviewed={(id) =>
              setProgress((p) =>
                p.flashcardsReviewed.includes(id)
                  ? p
                  : { ...p, flashcardsReviewed: [...p.flashcardsReviewed, id] },
              )
            }
            onHome={handleExitQuiz}
          />
        )}
      </main>

      {/* Footer with reset */}
      {view === 'dashboard' && (
        <footer className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-muted sm:flex-row"
            style={{ borderColor: 'rgb(var(--border-base))' }}
          >
            <p>
              Built for the <span className="font-semibold text-strong">AZ-900</span> exam · {QUESTIONS.length} questions across {DOMAINS.length} domains
            </p>
            <button onClick={handleResetAll} className="text-xs text-muted underline hover:text-red-500">
              Reset all progress
            </button>
          </div>
        </footer>
      )}

      <MasteryToast domainIds={pendingMastery} onDismiss={() => setPendingMastery([])} />
    </div>
  );
}
