// src/__tests__/GoalScorerFinalQuestion.test.ts
import './setup/goalScorerFinal.mocks';

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { NumberOfGoalsFinalQuestion, FirstGoalScorerFinalQuestion } from '../lib/GoalScorerFinalQuestion';
import {
  setupNumberOfGoalsQuestion,
  setupFirstGoalScorerQuestion,
} from './utils/setupGoalScorerFinal';
import { SUPPORTED_LOCALES } from './i18n/locales';
import { mockGetFinals, mockGetRandomItem, mockShuffleArray, mockGenerateWinnerQuestion, mockGoalsByMatchId } from './setup/goalScorerFinal.mocks';

// ─────────────────────────────────────────────────────────────────────────────
// NumberOfGoalsFinalQuestion
// ─────────────────────────────────────────────────────────────────────────────

describe.each(SUPPORTED_LOCALES)(
  'NumberOfGoalsFinalQuestion › generateTotalGoalsScoredFinalQuestion [%s]',
  (locale) => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockShuffleArray.mockImplementation(<T>(arr: T[]) => arr);
    });
    it('generates valid question structure', () => {
      const { t } = setupNumberOfGoalsQuestion({ locale });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(q.question).toBeDefined();
      expect(q.options).toHaveLength(4);
      expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswerIndex).toBeLessThan(4);
      expect(q.category).toBeDefined();
      expect(q.difficulty).toBeDefined();
    });

    it('includes the correct total goal count as a string option', () => {
      const { t, numberOfGoals } = setupNumberOfGoalsQuestion({ locale });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(q.options).toContain(numberOfGoals.toString());
    });

    it('correctAnswerIndex points to the correct goal count', () => {
      const { t, numberOfGoals } = setupNumberOfGoalsQuestion({ locale });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(q.options[q.correctAnswerIndex]).toBe(numberOfGoals.toString());
    });

    it('all options are numeric strings', () => {
      const { t } = setupNumberOfGoalsQuestion({ locale });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(q.options.every(opt => !isNaN(Number(opt)))).toBe(true);
    });

    it('does not include duplicate options', () => {
      const { t } = setupNumberOfGoalsQuestion({ locale });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(new Set(q.options).size).toBe(q.options.length);
    });

    it('question is properly localised — not a raw i18n key', () => {
      const { t } = setupNumberOfGoalsQuestion({ locale });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(q.question).not.toBe('questions.totalFinalGoalsScored');
      expect(q.question.length).toBeGreaterThan(0);
    });

    it('question contains the home team name', () => {
      const { t, expectedHomeTeam } = setupNumberOfGoalsQuestion({ locale });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(q.question).toContain(expectedHomeTeam);
    });

    it('question contains the away team name', () => {
      const { t, expectedAwayTeam } = setupNumberOfGoalsQuestion({ locale });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(q.question).toContain(expectedAwayTeam);
    });

    it('difficulty class is hard', () => {
      const { t } = setupNumberOfGoalsQuestion({ locale });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(q.difficultyClass).toBe('hard');
    });

    it('computes correct total from home + away scores', () => {
      const { t } = setupNumberOfGoalsQuestion({ locale, homeScore: 3, awayScore: 2 });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(q.options).toContain('5');
      expect(q.options[q.correctAnswerIndex]).toBe('5');
    });

    it('handles 0-0 final correctly', () => {
      const { t } = setupNumberOfGoalsQuestion({ locale, homeScore: 0, awayScore: 0 });
      const q = NumberOfGoalsFinalQuestion.generateTotalGoalsScoredFinalQuestion(t);

      expect(q.options[q.correctAnswerIndex]).toBe('0');
    });
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// FirstGoalScorerFinalQuestion
// ─────────────────────────────────────────────────────────────────────────────

describe.each(SUPPORTED_LOCALES)(
  'FirstGoalScorerFinalQuestion › generateFirstGoalScorerFinalQuestion [%s]',
  (locale) => {
    beforeEach(() => {
      vi.clearAllMocks();
      mockShuffleArray.mockImplementation(<T>(arr: T[]) => arr);
    });
    it('generates valid question structure', () => {
      const { t } = setupFirstGoalScorerQuestion({ locale });
      const q = FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion(t);

      expect(q.question).toBeDefined();
      expect(q.options).toHaveLength(4);
      expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswerIndex).toBeLessThan(4);
      expect(q.category).toBeDefined();
      expect(q.difficulty).toBeDefined();
    });

    it('includes the correct scorer in options', () => {
      const { t, scorerName } = setupFirstGoalScorerQuestion({ locale });
      const q = FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion(t);

      expect(q.options).toContain(scorerName);
    });

    it('correctAnswerIndex points to the correct scorer', () => {
      const { t, scorerName } = setupFirstGoalScorerQuestion({ locale });
      const q = FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion(t);

      expect(q.options[q.correctAnswerIndex]).toBe(scorerName);
    });

    it('does not include duplicate options', () => {
      const { t } = setupFirstGoalScorerQuestion({ locale });
      const q = FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion(t);

      expect(new Set(q.options).size).toBe(q.options.length);
    });

    it('question is properly localised — not a raw i18n key', () => {
      const { t } = setupFirstGoalScorerQuestion({ locale });
      const q = FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion(t);

      expect(q.question).not.toBe('questions.firstFinalGoalScorer');
      expect(q.question.length).toBeGreaterThan(0);
    });

    it('question contains the home team name', () => {
      const { t, expectedHomeTeam } = setupFirstGoalScorerQuestion({ locale });
      const q = FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion(t);

      expect(q.question).toContain(expectedHomeTeam);
    });

    it('question contains the away team name', () => {
      const { t, expectedAwayTeam } = setupFirstGoalScorerQuestion({ locale });
      const q = FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion(t);

      expect(q.question).toContain(expectedAwayTeam);
    });

    it('difficulty class is hard', () => {
      const { t } = setupFirstGoalScorerQuestion({ locale });
      const q = FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion(t);

      expect(q.difficultyClass).toBe('hard');
    });

    it('falls back to WinnerQuestion when no valid finals exist', () => {
      const { t } = setupFirstGoalScorerQuestion({ locale });

      // Override: all finals are 0-0 so the loop exhausts without finding valid goals
      mockGetFinals.mockReturnValue([
        {
          match_id:        'x',
          score:           '0–0',
          tournament_name: 'FIFA World Cup 2006',
          home_team_code:  'ITA',
          away_team_code:  'FRA',
          home_team_name:  'Italy',
          away_team_name:  'France',
          home_team_score: 0,
          away_team_score: 0,
        }
      ]);
      mockGetRandomItem.mockReturnValue({
        match_id:        'x',
        score:           '0–0',
        tournament_name: 'FIFA World Cup 2006',
        home_team_code:  'ITA',
        away_team_code:  'FRA',
        home_team_name:  'Italy',
        away_team_name:  'France',
        home_team_score: 0,
        away_team_score: 0,
      });
      mockGenerateWinnerQuestion.mockReturnValue({
        question: 'fallback question',
        options: ['A', 'B', 'C', 'D'],
        correctAnswerIndex: 0,
        difficulty: 'easy',
        difficultyClass: 'easy',
        category: 'fallback',
      });

      const q = FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion(t);

      expect(mockGenerateWinnerQuestion).toHaveBeenCalled();
      expect(q.question).toBe('fallback question');
    });

    it('falls back when match has no valid goal data', () => {
      const { t } = setupFirstGoalScorerQuestion({ locale });

      // Clear all goal data so the match map returns empty
      mockGoalsByMatchId.clear();
      mockGenerateWinnerQuestion.mockReturnValue({
        question: 'fallback question',
        options: ['A', 'B', 'C', 'D'],
        correctAnswerIndex: 0,
        difficulty: 'easy',
        difficultyClass: 'easy',
        category: 'fallback',
      });

      const q = FirstGoalScorerFinalQuestion.generateFirstGoalScorerFinalQuestion(t);

      expect(mockGenerateWinnerQuestion).toHaveBeenCalled();
      expect(q.question).toBe('fallback question');
    });
  }
);