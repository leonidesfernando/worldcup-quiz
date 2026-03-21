// src/lib/questionGenerator.ts
import { WinnerQuestion } from './WinnerQuestion';
import { FinalScoreQuestion } from './FinalScoreQuestion';
import { HostCountryQuestion } from './HostCountryQuestion';
import type { QuizQuestion } from '../types/QuizQuestion';
import { TopScorerQuestion } from './TopScorerQuestion';
import { BestPlayerQuestion } from './BestPlayerQuestion';
import { FirstGoalScorerFinalQuestion, NumberOfGoalsFinalQuestion } from './GoalScorerFinalQuestion';


export function generateRandomQuestion(t: (key: string, params?: Record<string, any>) => string): QuizQuestion {
type QuestionGenerator = (t: (key: string, params?: Record<string, any>) => string) => QuizQuestion;


const questionTypes: QuestionGenerator[] = [
    //HostCountryQuestion.generateHostCountryQuestion,
    //TopScorerQuestion.generateTopScorerQuestion,
    FinalScoreQuestion.generateFinalScoreQuestion,
    /*FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion,
    NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion,
    BestPlayerQuestion.generateBestPlayerQuestion,
    WinnerQuestion.generateWinnerQuestion,*/
  ];
    
  // Keep trying until we get a valid question (prevents rare crashes)
for (let attempt = 0; attempt < 10; attempt++) {
    const index = Math.floor(Math.random() * Date.now().valueOf()) % questionTypes.length;
    //console.log('INDEX: ' + index)
    const generator = questionTypes[index];
    //console.log('Question generator: ' + generator)
    try {
      return generator(t);
    } catch (err) {
      console.warn(`Question generation attempt ${attempt + 1} failed, retrying...`, err);
    }
  }
  console.warn('All question generation attempts failed – using fallback');
  return WinnerQuestion.generateWinnerQuestion(t); // ultimate fallback
}
