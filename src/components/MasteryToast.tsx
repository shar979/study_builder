import { useEffect } from 'react';
import { Award, X } from 'lucide-react';
import type { DomainId } from '@/types';
import { DOMAIN_MAP } from '@/data/domains';

interface MasteryToastProps {
  domainIds: DomainId[];
  onDismiss: () => void;
}

export default function MasteryToast({ domainIds, onDismiss }: MasteryToastProps) {
  useEffect(() => {
    if (domainIds.length === 0) return;
    const t = setTimeout(onDismiss, 6000);
    return () => clearTimeout(t);
  }, [domainIds, onDismiss]);

  if (domainIds.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4">
      <div className="animate-slide-up surface flex items-center gap-4 border-2 px-5 py-4 shadow-xl"
        style={{ borderColor: DOMAIN_MAP[domainIds[0]].color }}
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-white animate-pop"
          style={{ backgroundColor: DOMAIN_MAP[domainIds[0]].color }}
        >
          <Award size={24} />
        </div>
        <div>
          <p className="text-sm font-bold text-strong">
            Mastery badge unlocked!
          </p>
          <p className="text-xs text-muted">
            {domainIds.map((d) => DOMAIN_MAP[d].shortName).join(', ')} · 80%+ accuracy
          </p>
        </div>
        <button onClick={onDismiss} className="ml-2 text-muted hover:text-strong" aria-label="Dismiss">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
