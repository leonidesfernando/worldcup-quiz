
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  difficultyClass?: 'easy' | 'medium' | 'hard';
  difficulty: string;
  category?: string;
}
