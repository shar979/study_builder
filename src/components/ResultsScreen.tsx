import { useMemo } from 'react';
import { Trophy, Flame, Target, RefreshCw, Home, Award, TrendingUp } from 'lucide-react';
import type { AnswerRecord } from '@/types';
import { DOMAIN_MAP } from '@/data/domains';
import { QUESTION_MAP } from '@/data/questions';
import ScoreChart from './ScoreChart';
import type { OverallStats, DomainStat } from '@/lib/storage';
import { DOMAINS } from '@/data/domains';

interface ResultsScreenProps {
  sessionAnswers: AnswerRecord[];
  overallStats: OverallStats;
  onRetry: () => void;
  onHome: () => void;
}

export default function ResultsScreen({
  sessionAnswers,
  overallStats,
  onRetry,
  onHome,
}: ResultsScreenProps) {
  const total = sessionAnswers.length;
  const correct = sessionAnswers.filter((a) => a.correct).length;
  const accuracy = total > 0 ? correct / total : 0;
  const sessionStreak = useMemo(() => {
    let max = 0;
    let run = 0;
    for (const a of sessionAnswers) {
      if (a.correct) {
        run++;
        max = Math.max(max, run);
      } else {
        run = 0;
      }
    }
    return max;
  }, [sessionAnswers]);

  const passed = accuracy >= 0.7; // AZ-900 passing is 700/1000

  // Per-domain breakdown for this session
  const sessionDomainStats: DomainStat[] = DOMAINS.map((d) => {
    const recs = sessionAnswers.filter((a) => a.domainId === d.id);
    const c = recs.filter((r) => r.correct).length;
    return {
      domainId: d.id,
      total: c,
      correct: c,
      accuracy: recs.length > 0 ? c / recs.length : 0,
      answered: recs.length,
      available: 0,
      mastered: false,
    };
  });

  const verdict = passed
    ? { title: 'You are on track to pass!', sub: '70%+ is the AZ-900 passing threshold. Keep practicing to lock it in.' }
    : { title: 'Keep building your skills', sub: 'Review the explanations and re-run this set — you will get there.' };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-20 pt-6 sm:px-6">
      {/* Hero verdict */}
      <section
        className={`surface relative mb-6 overflow-hidden p-8 text-center ${
          passed ? 'animate-fade-in' : 'animate-fade-in'
        }`}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1"
          style={{
            background: passed
              ? 'linear-gradient(90deg,#10b981,#34d399)'
              : 'linear-gradient(90deg,#f59e0b,#f87171)',
          }}
        />
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            passed ? 'bg-emerald-500/15 text-emerald-500' : 'bg-amber-500/15 text-amber-500'
          }`}
        >
          {passed ? <Trophy size={32} /> : <TrendingUp size={32} />}
        </div>
        <h1 className="mt-4 text-2xl font-extrabold text-strong sm:text-3xl">{verdict.title}</h1>
        <p className="mt-2 text-sm text-muted">{verdict.sub}</p>

        {/* Big accuracy */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span
            className={`text-5xl font-extrabold tracking-tight ${
              passed ? 'text-emerald-500' : 'text-amber-500'
            }`}
          >
            {Math.round(accuracy * 100)}%
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">
          {correct} of {total} correct this session
        </p>
      </section>

      {/* Session stat row */}
      <section className="mb-6 grid grid-cols-3 gap-4">
        <ResultStat
          icon={<Target size={18} className="text-azure-500" />}
          value={`${correct}/${total}`}
          label="Correct"
        />
        <ResultStat
          icon={<Flame size={18} className="text-orange-500" />}
          value={`${sessionStreak}`}
          label="Best streak"
        />
        <ResultStat
          icon={<Award size={18} className="text-amber-500" />}
          value={`${overallStats.masteredCount}/3`}
          label="Domains mastered"
        />
      </section>

      {/* Radar chart using overall stats */}
      <section className="mb-6">
        <ScoreChart domainStats={overallStats.domainStats} />
      </section>

      {/* Question review */}
      <section className="surface mb-6 p-6">
        <h3 className="mb-4 text-lg font-bold text-strong">Question Review</h3>
        <div className="space-y-3">
          {sessionAnswers.map((a, i) => {
            const q = QUESTION_MAP[a.questionId];
            if (!q) return null;
            const domain = DOMAIN_MAP[a.domainId];
            return (
              <details
                key={a.questionId + i}
                className="group rounded-xl border p-3 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/50"
                style={{ borderColor: 'rgb(var(--border-base))' }}
              >
                <summary className="flex cursor-pointer list-none items-center gap-3">
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white ${
                      a.correct ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  >
                    {a.correct ? '✓' : '✗'}
                  </span>
                  <span className="flex-1 truncate text-sm font-medium text-strong">
                    {q.prompt}
                  </span>
                  <span
                    className="chip hidden sm:inline-flex"
                    style={{ backgroundColor: `${domain.color}1a`, color: domain.color }}
                  >
                    {domain.shortName}
                  </span>
                </summary>
                <div className="mt-3 pl-10 text-sm">
                  <p className="text-strong">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Correct: </span>
                    {q.options[q.correctIndex]}
                  </p>
                  {!a.correct && (
                    <p className="mt-1 text-muted">
                      <span className="font-semibold text-red-600 dark:text-red-400">Your answer: </span>
                      {q.options[a.selectedIndex] ?? '—'}
                    </p>
                  )}
                  <p className="mt-2 leading-relaxed text-muted">{q.whyCorrect}</p>
                  <a
                    href={`https://learn.microsoft.com${q.learnRef}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs font-medium text-azure-600 hover:underline dark:text-azure-400"
                  >
                    Review on Microsoft Learn →
                  </a>
                </div>
              </details>
            );
          })}
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button className="btn-primary flex-1" onClick={onRetry}>
          <RefreshCw size={18} /> Retry this set
        </button>
        <button className="btn-ghost flex-1" onClick={onHome}>
          <Home size={18} /> Back to dashboard
        </button>
      </div>
    </div>
  );
}

function ResultStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="surface p-4 text-center">
      <div className="mx-auto mb-1.5 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
        {icon}
      </div>
      <p className="text-2xl font-extrabold text-strong">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}
