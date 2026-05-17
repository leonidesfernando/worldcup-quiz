// src/__tests__/setup/goalScorerFinal.mocks.ts
import { vi } from 'vitest';

// ── Exported spies ────────────────────────────────────────────────────────────
export const mockGetFinals          = vi.fn();
export const mockGetRandomItem      = vi.fn();
export const mockRandomNumber       = vi.fn();
export const mockShuffleArray       = vi.fn(<T>(arr: T[]) => arr); // identity by default
export const mockGetCountryName     = vi.fn();
export const mockGetCountryNameByI18n = vi.fn();
export const mockGetScorerName      = vi.fn();
export const mockGetGoals           = vi.fn();
export const mockGenerateWinnerQuestion = vi.fn();

// goalsByMatchId is a Map — we expose a mutable one tests can populate
export const mockGoalsByMatchId = new Map<string, any[]>();

// ── MatchesServiceFactory ─────────────────────────────────────────────────────
vi.mock('../../service/factory/MatchesServiceFactory', () => ({
  createMatchesService: () => ({
    getFinals: mockGetFinals,
  }),
}));

// ── Utils ─────────────────────────────────────────────────────────────────────
vi.mock('../../utils/Utils', () => ({
  Utils: {
    getRandomItem:        mockGetRandomItem,
    randomNumber:         mockRandomNumber,
    shuffleArray:         mockShuffleArray,
    getYearByTournamentId: vi.fn(), // not used here but prevents import errors
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
    getScorerName: mockGetScorerName,
  },
}));

// ── WorldCupService ───────────────────────────────────────────────────────────
vi.mock('../../service/worldCupService', () => ({
  WorldCupService: class {
    getGoals = mockGetGoals;
  },
}));

// ── goalsByMatchId data map ───────────────────────────────────────────────────
vi.mock('../../data/worldcup', () => ({
  goalsByMatchId: mockGoalsByMatchId,
}));

// ── Constants ─────────────────────────────────────────────────────────────────
vi.mock('../../utils/Constants', () => ({
  Constants: {
    WORLD_CUP_REGEX: /FIFA World Cup /,
  },
}));

// ── WinnerQuestion fallback ───────────────────────────────────────────────────
vi.mock('../../lib/WinnerQuestion', () => ({
  WinnerQuestion: {
    generateWinnerQuestion: mockGenerateWinnerQuestion,
  },
}));