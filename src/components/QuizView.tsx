import { useMemo } from 'react';
import { Flame, X, CheckCircle2 } from 'lucide-react';
import type { QuizConfig, AnswerRecord } from '@/types';
import { QUESTION_MAP } from '@/data/questions';
import { DOMAIN_MAP } from '@/data/domains';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';

interface QuizViewProps {
  config: QuizConfig;
  current: number;
  streak: number;
  correctSoFar: number;
  sessionAnswers: AnswerRecord[];
  onAnswer: (selectedIndex: number, correct: boolean) => void;
  onAdvance: () => void;
  onExit: () => void;
}

export default function QuizView({
  config,
  current,
  streak,
  correctSoFar,
  sessionAnswers,
  onAnswer,
  onAdvance,
  onExit,
}: QuizViewProps) {
  const questions = useMemo(
    () => config.questionIds.map((id) => QUESTION_MAP[id]).filter(Boolean),
    [config.questionIds],
  );

  const total = questions.length;
  const q = questions[current];
  const isLast = current === total - 1;

  const title =
    config.mode === 'full'
      ? 'Full Practice Exam'
      : DOMAIN_MAP[config.domainId ?? '']?.shortName ?? 'Quiz';

  const progressValue = current / total;

  if (!q) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-muted">No questions available for this selection.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      {/* Quiz header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
          <p className="text-sm text-strong">
            {current + 1} / {total} · {correctSoFar} correct so far
          </p>
        </div>
        <div className="flex items-center gap-3">
          {streak > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1.5">
              <Flame size={16} className="animate-pop text-orange-500" />
              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{streak}</span>
            </div>
          )}
          <button
            onClick={onExit}
            className="flex h-9 w-9 items-center justify-center rounded-lg border text-muted transition-colors hover:bg-slate-100 hover:text-strong dark:hover:bg-slate-800"
            style={{ borderColor: 'rgb(var(--border-base))' }}
            aria-label="Exit quiz"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Progress bar with checkpoint dots */}
      <div className="mb-6">
        <ProgressBar value={progressValue} colorClass="bg-gradient-to-r from-azure-500 to-emerald-500" />
        <div className="mt-1.5 flex justify-between">
          {questions.map((qq, i) => {
            const past = i < current;
            const rec = past ? sessionAnswers[i] : null;
            return (
              <span
                key={qq.id}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  past
                    ? rec?.correct
                      ? 'bg-emerald-500'
                      : 'bg-red-500'
                    : i === current
                      ? 'bg-azure-500'
                      : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Card */}
      <div className="surface p-6 sm:p-8">
        <QuestionCard
          question={q}
          index={current}
          total={total}
          onAnswer={onAnswer}
          onNext={onAdvance}
          isLast={isLast}
        />
      </div>

      {isLast && current > 0 && (
        <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted">
          <CheckCircle2 size={15} className="text-emerald-500" />
          Last question — finish to see your results.
        </p>
      )}
    </div>
  );
}
