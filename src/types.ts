export type DomainId = 'cloud-concepts' | 'azure-architecture' | 'management-governance';

export interface Subtopic {
  id: string;
  name: string;
  weight: number; // approximate exam weight percentage within domain
}

export interface Domain {
  id: DomainId;
  name: string;
  shortName: string;
  examWeight: string;
  description: string;
  color: string; // tailwind hex used for charts
  icon: string; // lucide icon name (resolved in component)
  subtopics: Subtopic[];
}

export interface Question {
  id: string;
  domainId: DomainId;
  subtopicId: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced';
  prompt: string;
  options: string[];
  correctIndex: number;
  whyCorrect: string;
  whyWrong: string[];
  learnRef: string; // Microsoft Learn path, e.g. /training/modules/intro-to-azure-cloud/
  learnTitle: string;
}

export type QuizMode = 'domain' | 'full';

export interface QuizConfig {
  mode: QuizMode;
  domainId?: DomainId;
  questionIds: string[];
}

export interface AnswerRecord {
  questionId: string;
  selectedIndex: number;
  correct: boolean;
  domainId: DomainId;
  subtopicId: string;
  timestamp: number;
}

export interface ProgressState {
  answers: AnswerRecord[];
  currentStreak: number;
  bestStreak: number;
  masteredDomainIds: DomainId[];
  flashcardsReviewed: string[];
  lastActive: number;
}

export type View = 'dashboard' | 'quiz' | 'results' | 'flashcards' | 'stats';
