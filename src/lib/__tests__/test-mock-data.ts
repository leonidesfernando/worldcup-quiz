// src/lib/__tests__/test-utils.ts
import { vi } from 'vitest';

export const createHostQuestionMocks = () => {
  const mockRandomHost = {
    tournament_id: 'WC-2018',
    team_code: 'RUS',
  };

  const mockWrongCountryCodes = ['BRA', 'GER', 'FRA', 'ARG'];

  const mockCountryMap: Record<string, string> = {
    RUS: 'Russia',
    BRA: 'Brazil',
    GER: 'Germany',
    FRA: 'France',
    ARG: 'Argentina',
  };

  // Module mocks
  vi.mock('../../service/HostService', () => ({
    HostService: class {
      getRandomHost = vi.fn().mockReturnValue(mockRandomHost);
    },
  }));

  vi.mock('../../service/fatory/MatchesServiceFactory', () => ({
    createMatchesService: vi.fn().mockReturnValue({
      getOtherCountryCodes: vi.fn().mockReturnValue(mockWrongCountryCodes),
    }),
  }));

  vi.mock('../utils/Utils', () => ({
    Utils: {
      getYearByTournamentId: vi.fn().mockReturnValue('2018'),
    },
  }));

  vi.mock('../../utils/LangUtils', () => ({
    LangUtils: {
      getCountyName: vi.fn((_, name: string) => {
        const code = name.replace('countries.', '');
        return mockCountryMap[code] || name;
      }),
      getCountryNameByi18n: vi.fn((_, code: string) => `countries.${code}`),
    },
  }));

  return {
    mockRandomHost,
    mockWrongCountryCodes,
    mockCountryMap,
  };
};