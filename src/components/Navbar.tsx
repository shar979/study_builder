import { Moon, Sun, Flame, Trophy, Layers, Target, Zap, BookOpen } from 'lucide-react';
import type { OverallStats } from '@/lib/storage';

interface NavbarProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  stats: OverallStats;
  onGoHome: () => void;
  onOpenFlashcards: () => void;
}

export default function Navbar({
  theme,
  onToggleTheme,
  stats,
  onGoHome,
  onOpenFlashcards,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b backdrop-blur-md"
      style={{
        backgroundColor: 'rgb(var(--bg-elev) / 0.85)',
        borderColor: 'rgb(var(--border-base))',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        {/* Brand */}
        <button onClick={onGoHome} className="flex items-center gap-2.5 no-tap-highlight">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-azure-500 to-azure-700 text-white shadow-md shadow-azure-500/30">
            <Zap size={18} fill="currentColor" />
          </div>
          <div className="hidden text-left sm:block">
            <p className="text-sm font-extrabold leading-tight text-strong">SmartQuizzer</p>
            <p className="text-[11px] leading-tight text-muted">AZ-900 Builder</p>
          </div>
        </button>

        {/* Live stats */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <NavStat
            icon={<Target size={15} className="text-azure-500" />}
            value={`${Math.round(stats.overallAccuracy * 100)}%`}
            label="Accuracy"
          />
          <NavStat
            icon={<Layers size={15} className="text-emerald-500" />}
            value={`${stats.totalAnswered}`}
            label="Done"
          />
          <NavStat
            icon={<Flame size={15} className="text-orange-500" />}
            value={`${stats.currentStreak}`}
            label="Streak"
            pulse={stats.currentStreak > 0}
          />
          <NavStat
            icon={<Trophy size={15} className="text-amber-500" />}
            value={`${stats.masteredCount}/3`}
            label="Master"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenFlashcards}
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-slate-100 hover:text-strong sm:inline-flex dark:hover:bg-slate-800"
            aria-label="Flashcards"
          >
            <BookOpen size={16} />
            Flashcards
          </button>
          <button
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
            style={{ borderColor: 'rgb(var(--border-base))' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
}

function NavStat({
  icon,
  value,
  label,
  pulse = false,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  pulse?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 ${
        pulse ? 'bg-orange-500/10' : 'bg-slate-100 dark:bg-slate-800'
      }`}
      title={label}
    >
      <span className={pulse ? 'animate-pulse' : ''}>{icon}</span>
      <span className="text-sm font-bold text-strong">{value}</span>
    </div>
  );
}
