// src/lib/questionGenerator.ts
/*import { WinnerQuestion } from './WinnerQuestion';
import { FinalScoreQuestion } from './FinalScoreQuestion';
import { HostCountryQuestion } from './HostCountryQuestion';

import { TopScorerQuestion } from './TopScorerQuestion';
import { BestPlayerQuestion } from './BestPlayerQuestion';
import { FirstGoalScorerFinalQuestion, NumberOfGoalsFinalQuestion } from './GoalScorerFinalQuestion';
*/
import type { Translator } from '../i18n/i18n';
import type { QuizQuestion } from '../types/QuizQuestion';

export function generateRandomQuestion(
  t: Translator,
  generators: Array<(t: Translator) => QuizQuestion>,  // ← remove typeof here — it's causing cycle
  getRandomIndex: (max: number) => number = (max) => Math.floor(Math.random() * max)
): QuizQuestion {
  for (let attempt = 0; attempt < 10; attempt++) {
    const index = getRandomIndex(generators.length);
    const generator = generators[index];

    try {
      return generator(t);
    } catch (err) {
      console.warn(`Question generation attempt ${attempt + 1} failed`, err);
    }
  }

  console.warn('All attempts failed – using fallback');
  // Safest fallback: first generator (usually WinnerQuestion)
  return generators[0]?.(t) ?? {
    question: t('error.fallbackQuestion') || 'Error generating question',
    options: ['Error'],
    correctAnswerIndex: 0,
    difficulty: 'impossible',
    category: 'Error',
  };
}

/*
export function generateRandomQuestion(t: (key: string, params?: Record<string, any>,) => string): QuizQuestion {
type QuestionGenerator = (t: (key: string, params?: Record<string, any>) => string) => QuizQuestion;


const questionTypes: QuestionGenerator[] = [
    HostCountryQuestion.generateHostCountryQuestion,
    TopScorerQuestion.generateTopScorerQuestion,
    FinalScoreQuestion.generateFinalScoreQuestion,
    FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion,
    NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion,
    BestPlayerQuestion.generateBestPlayerQuestion,
    WinnerQuestion.generateWinnerQuestion,
  ];
    
  // Keep trying until we get a valid question (prevents rare crashes)
for (let attempt = 0; attempt < 10; attempt++) {
    const index = Math.floor(Math.random() * Date.now().valueOf()) % questionTypes.length;
    const generator = questionTypes[index];
    try {
      return generator(t);
    } catch (err) {
      console.warn(`Question generation attempt ${attempt + 1} failed, retrying...`, err);
    }
  }
  console.warn('All question generation attempts failed – using fallback');
  return WinnerQuestion.generateWinnerQuestion(t); // ultimate fallback
}
*/