// src/lib/questionGeneratorsList.ts
import { WinnerQuestion } from './WinnerQuestion';
import { FinalScoreQuestion } from './FinalScoreQuestion';
import { HostCountryQuestion } from './HostCountryQuestion';
import { TopScorerQuestion } from './TopScorerQuestion';
import { BestPlayerQuestion } from './BestPlayerQuestion';
import { FirstGoalScorerFinalQuestion, NumberOfGoalsFinalQuestion } from './GoalScorerFinalQuestion';
import type { QuizQuestion } from '../types/QuizQuestion';
import type { Translator } from '../i18n/i18n';
import { RunnerUpQuestion } from './RunnerUpQuestions';

// Export the list of pure generator functions
export const questionGenerators: Array<(t: Translator) => QuizQuestion> = [
    HostCountryQuestion.generateHostCountryQuestion,
    RunnerUpQuestion.generateRunnerUpQuestion,
    TopScorerQuestion.generateTopScorerQuestion,
    FinalScoreQuestion.generateFinalScoreQuestion,
    FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion,
    NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion,
    BestPlayerQuestion.generateBestPlayerQuestion,
    WinnerQuestion.generateWinnerQuestion,
] as const;