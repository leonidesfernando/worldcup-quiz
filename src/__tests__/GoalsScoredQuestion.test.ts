// src/__tests__/GoalsScoredQuestion.test.ts
import './setup/goalQuestion.mocks';

import { describe, it, expect } from 'vitest';
import { GoalsScoredQuestion } from '../lib/GoalsScoredQuestion';
import { setupGoalQuestion } from './utils/setupGoalQuestion';
import { SUPPORTED_LOCALES } from './i18n/locales';

// ─────────────────────────────────────────────────────────────────────────────
// generateTotalGoalScoredByPlayerInAppearance
// ─────────────────────────────────────────────────────────────────────────────

describe.each(SUPPORTED_LOCALES)(
  'GoalsScoredQuestion › generateTotalGoalScoredByPlayerInAppearance [%s]',
  (locale) => {
    it('generates valid question structure', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.question).toBeDefined();
      expect(q.options).toHaveLength(4);
      expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswerIndex).toBeLessThan(4);
      expect(q.category).toBeDefined();
      expect(q.difficulty).toBeDefined();
    });

    it('includes the correct tournament goal count as a string option', () => {
      const { t, goalsInTournament } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.options).toContain(goalsInTournament.toString());
    });

    it('correctAnswerIndex points to the tournament goal count', () => {
      const { t, goalsInTournament } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.options[q.correctAnswerIndex]).toBe(goalsInTournament.toString());
    });

    it('all options are numeric strings', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.options.every(opt => !isNaN(Number(opt)))).toBe(true);
    });

    it('does not include duplicate options', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(new Set(q.options).size).toBe(q.options.length);
    });

    it('question is properly localised — not a raw i18n key', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.question).not.toBe('questions.totalGoalsScoredByPlayerWorldCup');
      expect(q.question.length).toBeGreaterThan(0);
    });

    it('question contains the player name', () => {
      const { t, playerName } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.question).toContain(playerName);
    });

    it('question contains the localised country name', () => {
      const { t, expectedCountryName } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.question).toContain(expectedCountryName);
    });

    it('question contains the tournament year', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.question).toContain('2002');
    });

    it('difficulty class is hard', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.difficultyClass).toBe('hard');
    });

    it('supports players with 0 goals in a tournament', () => {
      const { t } = setupGoalQuestion({ locale, goalsInTournament: 0 });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.options).toContain('0');
      expect(q.options[q.correctAnswerIndex]).toBe('0');
    });

    it('supports different team codes', () => {
      const { t, expectedCountryName } = setupGoalQuestion({ locale, teamCode: 'ARG' });
      const q = GoalsScoredQuestion.generateTotalGoalScoredByPlayerInAppearance(t);

      expect(q.question).toContain(expectedCountryName);
    });
  }
);

// ─────────────────────────────────────────────────────────────────────────────
// generateTotalGoalsScoredByPlayer (career total)
// ─────────────────────────────────────────────────────────────────────────────

describe.each(SUPPORTED_LOCALES)(
  'GoalsScoredQuestion › generateTotalGoalsScoredByPlayer [%s]',
  (locale) => {
    it('generates valid question structure', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.question).toBeDefined();
      expect(q.options).toHaveLength(4);
      expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswerIndex).toBeLessThan(4);
      expect(q.category).toBeDefined();
      expect(q.difficulty).toBeDefined();
    });

    it('includes the correct career total as a string option', () => {
      const { t, totalGoalsCareer } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.options).toContain(totalGoalsCareer.toString());
    });

    it('correctAnswerIndex points to the career total', () => {
      const { t, totalGoalsCareer } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.options[q.correctAnswerIndex]).toBe(totalGoalsCareer.toString());
    });

    it('all options are numeric strings', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.options.every(opt => !isNaN(Number(opt)))).toBe(true);
    });

    it('does not include duplicate options', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(new Set(q.options).size).toBe(q.options.length);
    });

    it('question is properly localised — not a raw i18n key', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.question).not.toBe('questions.totalGoalsScoredByPlayer');
      expect(q.question.length).toBeGreaterThan(0);
    });

    it('question contains the player name', () => {
      const { t, playerName } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.question).toContain(playerName);
    });

    it('question contains the localised country name', () => {
      const { t, expectedCountryName } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.question).toContain(expectedCountryName);
    });

    it('career question does not contain literal {year} placeholder', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.question).not.toContain('{year}');
      expect(q.question).not.toContain('undefined');
    });

    it('difficulty class is hard', () => {
      const { t } = setupGoalQuestion({ locale });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.difficultyClass).toBe('hard');
    });

    it('uses career total, not tournament total', () => {
      const { t, totalGoalsCareer, goalsInTournament } = setupGoalQuestion({
        locale,
        goalsInTournament: 4,
        totalGoalsCareer: 20,
      });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.options[q.correctAnswerIndex]).toBe(totalGoalsCareer.toString());
      expect(q.options[q.correctAnswerIndex]).not.toBe(goalsInTournament.toString());
    });

    it('supports players with 1 career goal', () => {
      const { t } = setupGoalQuestion({ locale, totalGoalsCareer: 1 });
      const q = GoalsScoredQuestion.generateTotalGoalsScoredByPlayer(t);

      expect(q.options).toContain('1');
      expect(q.options[q.correctAnswerIndex]).toBe('1');
    });
  }
);