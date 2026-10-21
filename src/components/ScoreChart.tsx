import type { DomainStat } from '@/lib/storage';
import { DOMAINS } from '@/data/domains';
import { getDomainIcon } from '@/lib/icons';

interface ScoreChartProps {
  domainStats: DomainStat[];
}

/**
 * Custom SVG radar chart visualizing accuracy across the 3 AZ-900 domains.
 * Falls back gracefully when there is no data yet.
 */
export default function ScoreChart({ domainStats }: ScoreChartProps) {
  const size = 260;
  const center = size / 2;
  const radius = size / 2 - 40;
  const axes = DOMAINS.length;

  // Compute polygon points for each accuracy level
  const ringLevels = [0.25, 0.5, 0.75, 1.0];

  function pointFor(index: number, value: number) {
    const angle = (Math.PI * 2 * index) / axes - Math.PI / 2;
    const r = radius * value;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  const dataPoints = DOMAINS.map((_, i) => {
    const ds = domainStats[i];
    const value = ds && ds.answered > 0 ? ds.accuracy : 0;
    return pointFor(i, value);
  });
  const dataPolygon = dataPoints.map(([x, y]) => `${x},${y}`).join(' ');

  return (
    <div className="surface p-6">
      <h3 className="text-lg font-bold text-strong">Domain Mastery Radar</h3>
      <p className="mt-1 text-sm text-muted">Accuracy across the three AZ-900 domains.</p>

      <div className="mt-4 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
          {/* Rings */}
          {ringLevels.map((lvl) => {
            const pts = DOMAINS.map((_, i) => pointFor(i, lvl).join(',')).join(' ');
            return (
              <polygon
                key={lvl}
                points={pts}
                fill="none"
                stroke="rgb(var(--border-base))"
                strokeWidth={1}
                opacity={0.6}
              />
            );
          })}

          {/* Axes */}
          {DOMAINS.map((_, i) => {
            const [x, y] = pointFor(i, 1);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgb(var(--border-base))"
                strokeWidth={1}
                opacity={0.5}
              />
            );
          })}

          {/* Data polygon */}
          <polygon
            points={dataPolygon}
            fill="rgba(47,135,245,0.2)"
            stroke="#2f87f5"
            strokeWidth={2}
            className="animate-scale-in"
            style={{ transformOrigin: `${center}px ${center}px` }}
          />

          {/* Data points */}
          {dataPoints.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={4}
              fill={DOMAINS[i].color}
              className="animate-pop"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          ))}

          {/* Axis labels */}
          {DOMAINS.map((d, i) => {
            const [x, y] = pointFor(i, 1.18);
            return (
              <text
                key={d.id}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-current text-[10px] font-semibold"
                style={{ fill: d.color }}
              >
                {d.shortName.split(' ')[0]}
              </text>
            );
          })}
        </svg>

        {/* Legend / breakdown */}
        <div className="w-full flex-1 space-y-3">
          {DOMAINS.map((d, i) => {
            const ds = domainStats[i];
            const Icon = getDomainIcon(d.icon);
            const pct = ds && ds.answered > 0 ? Math.round(ds.accuracy * 100) : 0;
            return (
              <div key={d.id} className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${d.color}1a`, color: d.color }}
                >
                  <Icon size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-semibold text-strong">{d.shortName}</p>
                    <p className="text-sm font-bold" style={{ color: d.color }}>
                      {ds && ds.answered > 0 ? `${pct}%` : '—'}
                    </p>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${pct}%`, backgroundColor: d.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
