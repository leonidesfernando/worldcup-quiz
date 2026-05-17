// src/__tests__/setup/goalQuestion.mocks.ts
import { vi } from 'vitest';

// ── Exported spies ────────────────────────────────────────────────────────────
export const mockGetRandomGoal               = vi.fn();
export const mockGetGoalsByPlayerNameAndYear = vi.fn();
export const mockGetTotalGoalsByPlayerName   = vi.fn();
export const mockGetCountryName              = vi.fn();
export const mockGetCountryNameByI18n        = vi.fn();
export const mockGetScorerName               = vi.fn();
export const mockGetYearByTournamentId       = vi.fn();
export const mockShuffleArray                = vi.fn(<T>(arr: T[]) => arr);
export const mockGenerateWrongGoalNumbers    = vi.fn();

// ── GoalServiceFactory ────────────────────────────────────────────────────────
vi.mock('../../service/factory/GoalServiceFactory', () => ({
  createGoalService: () => ({
    getRandomGoal:               mockGetRandomGoal,
    getGoalsByPlayerNameAndYear: mockGetGoalsByPlayerNameAndYear,
    getTotalGoalsByPlayerName:   mockGetTotalGoalsByPlayerName,
  }),
}));

// ── Utils ─────────────────────────────────────────────────────────────────────
vi.mock('../../utils/Utils', () => ({
  Utils: {
    getYearByTournamentId: mockGetYearByTournamentId,
    shuffleArray:          mockShuffleArray,
    randomNumber:          vi.fn(),
  },
}));

// ── LangUtils ─────────────────────────────────────────────────────────────────
vi.mock('../../utils/LangUtils', () => ({
  LangUtils: {
    getCountyName:        mockGetCountryName,
    getCountryNameByi18n: mockGetCountryNameByI18n,
  },
}));

// ── GoalUtils ─────────────────────────────────────────────────────────────────
vi.mock('../../utils/GoalUtils', () => ({
  GoalUtils: {
    getScorerName:            mockGetScorerName,
    generateWrongGoalNumbers: mockGenerateWrongGoalNumbers,
  },
}));