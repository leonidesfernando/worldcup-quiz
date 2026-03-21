
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  category?: string;
}
