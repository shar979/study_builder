import { useState } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, BookOpen, Sparkles } from 'lucide-react';
import type { DomainId } from '@/types';
import { DOMAINS, DOMAIN_MAP } from '@/data/domains';
import { QUESTIONS } from '@/data/questions';

interface FlashcardsProps {
  reviewedIds: string[];
  onReviewed: (id: string) => void;
  onHome: () => void;
}

export default function Flashcards({ reviewedIds, onReviewed, onHome }: FlashcardsProps) {
  const [domainFilter, setDomainFilter] = useState<DomainId | 'all'>('all');
  const [flipped, setFlipped] = useState(false);
  const [pos, setPos] = useState(0);

  const cards = QUESTIONS.filter(
    (q) => domainFilter === 'all' || q.domainId === domainFilter,
  );

  const current = cards[pos % cards.length];

  function next() {
    setFlipped(false);
    setTimeout(() => setPos((p) => (p + 1) % cards.length), 150);
  }
  function prev() {
    setFlipped(false);
    setTimeout(() => setPos((p) => (p - 1 + cards.length) % cards.length), 150);
  }
  function flip() {
    setFlipped((f) => !f);
    if (!reviewedIds.includes(current.id)) onReviewed(current.id);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-6 sm:px-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-extrabold text-strong">
            <BookOpen className="text-azure-500" size={24} /> Flashcards
          </h1>
          <p className="mt-1 text-sm text-muted">
            Tap the card to reveal the answer. {reviewedIds.length} reviewed so far.
          </p>
        </div>
        <button onClick={onHome} className="btn-ghost">Dashboard</button>
      </div>

      {/* Domain filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        <FilterChip active={domainFilter === 'all'} onClick={() => { setDomainFilter('all'); setPos(0); setFlipped(false); }}>
          All domains
        </FilterChip>
        {DOMAINS.map((d) => (
          <FilterChip
            key={d.id}
            active={domainFilter === d.id}
            onClick={() => { setDomainFilter(d.id); setPos(0); setFlipped(false); }}
            color={d.color}
          >
            {d.shortName}
          </FilterChip>
        ))}
      </div>

      {/* Card */}
      <div className="perspective mb-6">
        <button
          onClick={flip}
          className="relative block h-72 w-full preserve-3d no-tap-highlight transition-transform duration-500"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          {/* Front */}
          <div className="backface-hidden absolute inset-0 surface flex flex-col items-center justify-center p-8 text-center">
            <span
              className="chip mb-4"
              style={{ backgroundColor: `${DOMAIN_MAP[current.domainId].color}1a`, color: DOMAIN_MAP[current.domainId].color }}
            >
              {DOMAIN_MAP[current.domainId].shortName} · {current.difficulty}
            </span>
            <p className="text-lg font-bold leading-snug text-strong sm:text-xl">{current.prompt}</p>
            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted">
              <Sparkles size={13} /> Tap to flip
            </p>
          </div>
          {/* Back */}
          <div
            className="backface-hidden absolute inset-0 surface flex flex-col items-center justify-center overflow-y-auto p-6 text-center"
            style={{ transform: 'rotateY(180deg)' }}
          >
            <p className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400">
              Correct answer
            </p>
            <p className="mt-2 text-base font-bold leading-snug text-strong sm:text-lg">
              {current.options[current.correctIndex]}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{current.whyCorrect}</p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-muted">
              <RotateCcw size={12} /> Tap to flip back
            </p>
          </div>
        </button>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button onClick={prev} className="btn-ghost">
          <ChevronLeft size={18} /> Prev
        </button>
        <span className="text-sm text-muted">
          {(pos % cards.length) + 1} / {cards.length}
        </span>
        <button onClick={next} className="btn-ghost">
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  color,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`chip transition-all ${
        active
          ? 'text-white'
          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
      }`}
      style={active && color ? { backgroundColor: color } : active ? { backgroundColor: '#2f87f5' } : undefined}
    >
      {children}
    </button>
  );
}
