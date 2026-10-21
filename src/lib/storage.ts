import type { ProgressState, AnswerRecord, DomainId } from '@/types';
import { DOMAINS } from '@/data/domains';
import { QUESTIONS } from '@/data/questions';

const STORAGE_KEY = 'smartquizzer.progress.v1';
const THEME_KEY = 'smartquizzer.theme.v1';

const MASTERY_THRESHOLD = 0.8; // 80% accuracy with enough questions = mastered

export const emptyProgress: ProgressState = {
  answers: [],
  currentStreak: 0,
  bestStreak: 0,
  masteredDomainIds: [],
  flashcardsReviewed: [],
  lastActive: Date.now(),
};

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...emptyProgress };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return { ...emptyProgress, ...parsed };
  } catch {
    return { ...emptyProgress };
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota errors silently
  }
}

export function loadTheme(): 'light' | 'dark' {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {
    // ignore
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

export function saveTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
}

// ── Derived stats ──────────────────────────────────────────────────────

export interface DomainStat {
  domainId: DomainId;
  total: number;
  correct: number;
  accuracy: number; // 0..1
  answered: number;
  available: number;
  mastered: boolean;
}

export interface OverallStats {
  totalAnswered: number;
  totalCorrect: number;
  overallAccuracy: number; // 0..1
  currentStreak: number;
  bestStreak: number;
  domainStats: DomainStat[];
  masteredCount: number;
}

export function computeStats(state: ProgressState): OverallStats {
  const byDomain: Record<string, AnswerRecord[]> = {};
  for (const a of state.answers) {
    (byDomain[a.domainId] ||= []).push(a);
  }

  const domainStats: DomainStat[] = DOMAINS.map((d) => {
    const recs = byDomain[d.id] ?? [];
    const correct = recs.filter((r) => r.correct).length;
    const answered = recs.length;
    const available = QUESTIONS.filter((q) => q.domainId === d.id).length;
    const accuracy = answered > 0 ? correct / answered : 0;
    const mastered =
      answered >= 5 && accuracy >= MASTERY_THRESHOLD && state.masteredDomainIds.includes(d.id);
    return {
      domainId: d.id,
      total: correct,
      correct,
      accuracy,
      answered,
      available,
      mastered,
    };
  });

  const totalCorrect = state.answers.filter((a) => a.correct).length;
  const totalAnswered = state.answers.length;

  return {
    totalAnswered,
    totalCorrect,
    overallAccuracy: totalAnswered > 0 ? totalCorrect / totalAnswered : 0,
    currentStreak: state.currentStreak,
    bestStreak: state.bestStreak,
    domainStats,
    masteredCount: domainStats.filter((d) => d.mastered).length,
  };
}

export function recomputeMastery(state: ProgressState): DomainId[] {
  const stats = computeStats(state);
  const mastered: DomainId[] = [...state.masteredDomainIds];
  for (const ds of stats.domainStats) {
    if (ds.answered >= 5 && ds.accuracy >= MASTERY_THRESHOLD && !mastered.includes(ds.domainId)) {
      mastered.push(ds.domainId);
    }
  }
  return mastered;
}

export function applyAnswer(
  state: ProgressState,
  record: AnswerRecord,
): { state: ProgressState; newMastery: DomainId[] } {
  const answers = [...state.answers, record];
  const correct = record.correct;
  const currentStreak = correct ? state.currentStreak + 1 : 0;
  const bestStreak = Math.max(state.bestStreak, currentStreak);
  const next: ProgressState = {
    ...state,
    answers,
    currentStreak,
    bestStreak,
    masteredDomainIds: [...state.masteredDomainIds],
    lastActive: Date.now(),
  };
  const mastered = recomputeMastery(next);
  const newlyMastered = mastered.filter((m) => !next.masteredDomainIds.includes(m));
  next.masteredDomainIds = mastered;
  return { state: next, newMastery: newlyMastered };
}

export function resetProgress(): ProgressState {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  return { ...emptyProgress };
}
