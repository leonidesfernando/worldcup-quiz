// src/lib/__tests__/fixtures/hostQuestion.fixture.ts

export type HostFixture = {
  tournament_id: string;
  team_code: string;
};

export const createHostFixture = (
  overrides: Partial<HostFixture> = {}
): HostFixture => ({
  tournament_id: 'WC-2018',
  team_code: 'RUS',
  ...overrides,
});

// Optional helper for bulk scenarios
export const createWrongCountryCodes = (
  overrides?: string[]
): string[] => {
  return overrides ?? ['BRA', 'GER', 'FRA', 'ARG'];
};