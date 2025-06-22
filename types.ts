
import { LucideIcon } from 'lucide-react';

export interface AnswerOption {
  value: string;
  label: string;
}

export interface Question {
  key: string;
  question: string;
  options: AnswerOption[];
  condition?: (answers: Answers) => boolean;
}

export interface Answers {
  [key: string]: string;
}

export interface Recommendation {
  isComplete: true;
  title: string;
  treatment: string;
  redirectToTabId?: string; // ID of the tab to redirect to
  treatmentActionLabel?: string; // Label for the button if redirectToTabId is present
  alternatives?: string[];
  notes?: string[];
  posology?: string;
  followUp?: string;
}

export interface IncompleteRecommendation {
  isComplete: false;
}

export type RecommendationResult = Recommendation | IncompleteRecommendation;


export interface HistoryItem {
  id: number;
  timestamp: string;
  tab: string;
  recommendation: Recommendation;
  answers: Answers;
}

export interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;
}