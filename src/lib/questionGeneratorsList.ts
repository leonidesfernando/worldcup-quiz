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
import { MatchesPlayedByPlayerQuestion } from './MatchesPlayedByPlayerQuestion';
import { Utils } from '../utils/Utils';

// Export the list of pure generator functions
export const questionGenerators: Array<(t: Translator) => QuizQuestion> = 
Utils.shuffleArray(
[
    HostCountryQuestion.generateHostCountryQuestion,
    RunnerUpQuestion.generateRunnerUpQuestion,
    TopScorerQuestion.generateTopScorerQuestion, 
    MatchesPlayedByPlayerQuestion.generateMatchesPlayedByPlayerQuestion,
    FinalScoreQuestion.generateFinalScoreQuestion,
    FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion,
    NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion,
    BestPlayerQuestion.generateBestYoungPlayerQuestion,
    BestPlayerQuestion.generateSilverBallPlayerQuestion,
    BestPlayerQuestion.generateBestPlayerQuestion,
    BestPlayerQuestion.generateGoldenGlovePlayerQuestion,
    WinnerQuestion.generateWinnerQuestion
] as const);