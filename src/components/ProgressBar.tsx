interface ProgressBarProps {
  value: number; // 0..1
  max?: number;
  colorClass?: string; // tailwind bg-* class
  trackClass?: string;
  animate?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  colorClass = 'bg-azure-500',
  trackClass = 'bg-slate-200 dark:bg-slate-700',
  animate = true,
  className = '',
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div
      className={`h-2.5 w-full overflow-hidden rounded-full ${trackClass} ${className}`}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full ${colorClass} ${animate ? 'transition-all duration-700 ease-out' : ''}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
