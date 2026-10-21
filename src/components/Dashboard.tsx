import type { DomainId } from '@/types';
import { DOMAINS } from '@/data/domains';
import { getDomainIcon } from '@/lib/icons';
import type { OverallStats } from '@/lib/storage';
import ProgressBar from './ProgressBar';

interface DashboardProps {
  stats: OverallStats;
  masteredDomainIds: DomainId[];
  onStartDomain: (domainId: DomainId) => void;
  onStartFull: () => void;
  onOpenFlashcards: () => void;
}

export default function Dashboard({
  stats,
  masteredDomainIds,
  onStartDomain,
  onStartFull,
  onOpenFlashcards,
}: DashboardProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-6 sm:px-6">
      {/* Hero */}
      <section className="surface relative mb-8 overflow-hidden p-8 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-azure-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative">
          <span className="chip bg-azure-500/10 text-azure-600 dark:text-azure-300">
            AZ-900 · Microsoft Azure Fundamentals
          </span>
          <h1 className="mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-strong sm:text-4xl">
            Master the Azure Fundamentals exam, one question at a time.
          </h1>
          <p className="mt-3 max-w-2xl text-base text-muted">
            Instant feedback on every answer, real-world explanations of why each option is right or
            wrong, streak rewards, and a live score breakdown across all three AZ-900 domains.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-primary text-base" onClick={onStartFull}>
              Start Full Practice Exam
            </button>
            <button className="btn-ghost" onClick={onOpenFlashcards}>
              Browse Flashcards
            </button>
          </div>
        </div>
      </section>

      {/* Overall stat cards */}
      <section className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Overall Accuracy"
          value={`${Math.round(stats.overallAccuracy * 100)}%`}
          sub={`${stats.totalCorrect}/${stats.totalAnswered} correct`}
          color="text-azure-500"
          icon="target"
        />
        <StatCard
          label="Completed"
          value={`${stats.totalAnswered}`}
          sub="questions answered"
          color="text-emerald-500"
          icon="check"
        />
        <StatCard
          label="Current Streak"
          value={`${stats.currentStreak}`}
          sub={`best: ${stats.bestStreak}`}
          color="text-orange-500"
          icon="flame"
        />
        <StatCard
          label="Domains Mastered"
          value={`${stats.masteredCount}/3`}
          sub="at 80% accuracy"
          color="text-amber-500"
          icon="badge"
        />
      </section>

      {/* Domain cards */}
      <section className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-strong">Practice by Domain</h2>
        <span className="text-sm text-muted">{DOMAINS.length} domains · {stats.totalAnswered} answered</span>
      </section>

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {DOMAINS.map((d) => {
          const ds = stats.domainStats.find((s) => s.domainId === d.id)!;
          const Icon = getDomainIcon(d.icon);
          const mastered = masteredDomainIds.includes(d.id);
          return (
            <button
              key={d.id}
              onClick={() => onStartDomain(d.id)}
              className="surface group relative p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-azure-500"
            >
              <div className="flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${d.color}1a`, color: d.color }}
                >
                  <Icon size={24} />
                </div>
                <span className="chip bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {d.examWeight}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-strong">{d.shortName}</h3>
              <p className="mt-1 text-sm text-muted">{d.description}</p>

              <div className="mt-4 flex items-center justify-between text-xs text-muted">
                <span>
                  {ds.answered}/{ds.available} answered
                </span>
                <span className="font-semibold text-strong">
                  {ds.answered > 0 ? `${Math.round(ds.accuracy * 100)}%` : '—'}
                </span>
              </div>
              <ProgressBar
                value={ds.accuracy}
                colorClass="bg-current"
                className="mt-2"
              />
              <div
                className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-200 group-hover:opacity-100`}
                style={{ boxShadow: `inset 0 0 0 1.5px ${d.color}`, opacity: 0 }}
              />

              {mastered && (
                <span
                  className="absolute right-4 top-4 chip text-white"
                  style={{ backgroundColor: d.color }}
                >
                  Mastered
                </span>
              )}
            </button>
          );
        })}
      </section>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  color: string;
  icon: 'target' | 'check' | 'flame' | 'badge';
}

function StatCard({ label, value, sub, color }: StatCardProps) {
  return (
    <div className="surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-2 text-3xl font-extrabold ${color}`}>{value}</p>
      <p className="mt-1 text-xs text-muted">{sub}</p>
    </div>
  );
}
