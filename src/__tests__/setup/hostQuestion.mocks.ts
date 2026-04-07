// src/__tests__/setup/hostQuestion.mocks.ts
import { vi } from 'vitest';

// Exported spies (controlled in tests/setup)
export const mockGetRandomHost = vi.fn();
export const mockGetOtherCountryCodes = vi.fn();
export const mockGetYearByTournamentId = vi.fn();
export const mockGetCountryName = vi.fn();
export const mockGetCountryNameByI18n = vi.fn();
export const mockGetYear = vi.fn();
export const mockGetHostsByTournamentId = vi.fn<() => string[]>();


// HostService mock
vi.mock('../../service/HostService', () => ({
  HostService: class {
    getRandomHost = mockGetRandomHost;
    getHostsByTournamentId = mockGetHostsByTournamentId;
  },
}));


vi.mock('../../service/factory/HostsServiceFactory', () => ({
  createHostsService: () => ({
    getRandomHost: mockGetRandomHost,
    getHostsByTournamentId: mockGetHostsByTournamentId,
  }),
}));

// MatchesServiceFactory mock
vi.mock('../../service/factory/MatchesServiceFactory', () => ({
  createMatchesService: () => ({
    getOtherCountryCodes: mockGetOtherCountryCodes,
  }),
}));

// Utils mock
vi.mock('../utils/Utils', () => ({
  Utils: {
    getYearByTournamentId: mockGetYearByTournamentId,
  },
}));

// LangUtils mock (i18n bridge)
vi.mock('../../utils/LangUtils', () => ({
  LangUtils: {
    getCountyName: mockGetCountryName,
    getCountryNameByi18n: mockGetCountryNameByI18n,
  },
}));