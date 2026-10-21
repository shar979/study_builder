import {
  Cloud,
  Server,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

const ICONS: Record<string, LucideIcon> = {
  Cloud,
  Server,
  ShieldCheck,
};

export function getDomainIcon(name: string): LucideIcon {
  return ICONS[name] ?? Cloud;
}
