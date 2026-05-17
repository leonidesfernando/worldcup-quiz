// src/__tests__/utils/setupGoalQuestion.ts
import {
  mockGetRandomGoal,
  mockGetGoalsByPlayerNameAndYear,
  mockGetTotalGoalsByPlayerName,
  mockGetCountryName,
  mockGetCountryNameByI18n,
  mockGetScorerName,
  mockGetYearByTournamentId,
  mockShuffleArray,
  mockGenerateWrongGoalNumbers,
} from '../setup/goalQuestion.mocks';

import { getCountryName } from '../i18n/i18nTestUtils';
import type { Locale } from '../i18n/locales';

interface GoalFixtureOptions {
  given_name?:     string;
  family_name?:    string;
  team_code?:      string;
  tournament_id?:  string;
  player_team_code?: string;
}

export const createGoalFixture = (opts: GoalFixtureOptions = {}) => ({
  given_name:       opts.given_name       ?? 'Ronaldo',
  family_name:      opts.family_name      ?? 'Nazário',
  team_code:        opts.team_code        ?? 'BRA',
  tournament_id:    opts.tournament_id    ?? '2002',
  player_team_code: opts.player_team_code ?? opts.team_code ?? 'BRA',
});

interface SetupOptions {
  locale?:            Locale;
  teamCode?:          string;
  goalsInTournament?: number;
  totalGoalsCareer?:  number;
  playerName?:        string;
  wrongGoalNumbers?:  number[];
}

export const setupGoalQuestion = (opts: SetupOptions = {}) => {
  const locale            = opts.locale            ?? 'en';
  const teamCode          = opts.teamCode           ?? 'BRA';
  const goalsInTournament = opts.goalsInTournament  ?? 8;
  const totalGoalsCareer  = opts.totalGoalsCareer   ?? 15;
  const playerName        = opts.playerName         ?? 'Ronaldo Nazário';
  const wrongGoalNumbers  = opts.wrongGoalNumbers   ?? [3, 5, 11];

  const goal = createGoalFixture({ team_code: teamCode });

  mockGetRandomGoal.mockReturnValue(goal);
  mockGetGoalsByPlayerNameAndYear.mockReturnValue(goalsInTournament);
  mockGetTotalGoalsByPlayerName.mockReturnValue(totalGoalsCareer);
  mockGetYearByTournamentId.mockReturnValue('2002');
  mockGetScorerName.mockReturnValue(playerName);
  mockGenerateWrongGoalNumbers.mockReturnValue(wrongGoalNumbers);
  mockShuffleArray.mockImplementation(<T>(arr: T[]) => arr);

  mockGetCountryNameByI18n.mockImplementation((_: unknown, code: string) => `countries.${code}`);
  mockGetCountryName.mockImplementation((_: unknown, key: string) => {
    const code = key.replace('countries.', '');
    return getCountryName(locale, code);
  });

  const expectedCountryName = getCountryName(locale, teamCode);

  /**
   * Custom t() that interpolates params into the key string.
   * This means q.question will be something like:
   *   "questions.totalGoalsScoredByPlayerWorldCup playerName=Ronaldo Nazário countryName=Brazil year=2002"
   * which contains playerName, countryName and year — making all
   * toContain() assertions work without needing real translation files.
   *
   * Keys without params (difficulty, category, correct/wrong labels)
   * return the key as-is, matching how createT behaves in other setups.
   */
  const t = (key: string, params?: Record<string, unknown>): string => {
    if (!params || Object.keys(params).length === 0) return key;
    const paramStr = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join(' ');
    return `${key} ${paramStr}`;
  };

  return {
    t,
    locale,
    goal,
    goalsInTournament,
    totalGoalsCareer,
    playerName,
    teamCode,
    expectedCountryName,
  };
};