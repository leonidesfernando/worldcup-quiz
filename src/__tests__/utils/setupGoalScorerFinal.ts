// src/__tests__/utils/setupGoalScorerFinal.ts
import {
  mockGetFinals,
  mockGetRandomItem,
  mockRandomNumber,
  mockShuffleArray,
  mockGetCountryName,
  mockGetCountryNameByI18n,
  mockGetScorerName,
  mockGetGoals,
  mockGoalsByMatchId,
  mockGenerateWinnerQuestion,
} from '../setup/goalScorerFinal.mocks';

import { getCountryName } from '../i18n/i18nTestUtils';
import type { Locale } from '../i18n/locales';

// ── Shared interpolating t() ──────────────────────────────────────────────────
// Returns "key param1=value1 param2=value2" when params are present, so
// toContain() assertions on team names, years etc. work without real translation files.
// Keys without params return the key as-is (structure/difficulty/category checks).
function createInterpolatingT() {
  return (key: string, params?: Record<string, unknown>): string => {
    if (!params || Object.keys(params).length === 0) return key;
    const paramStr = Object.entries(params)
      .map(([k, v]) => `${k}=${v}`)
      .join(' ');
    return `${key} ${paramStr}`;
  };
}

// ── Fixture factories ─────────────────────────────────────────────────────────

interface MatchFixtureOptions {
  match_id?:        string;
  tournament_name?: string;
  home_team_code?:  string;
  away_team_code?:  string;
  home_team_name?:  string;
  away_team_name?:  string;
  home_team_score?: number;
  away_team_score?: number;
  score?:           string;
}

export const createFinalMatchFixture = (opts: MatchFixtureOptions = {}) => ({
  match_id:        opts.match_id        ?? 'match-final-2002',
  tournament_name: opts.tournament_name ?? 'FIFA World Cup 2002',
  home_team_code:  opts.home_team_code  ?? 'BRA',
  away_team_code:  opts.away_team_code  ?? 'GER',
  home_team_name:  opts.home_team_name  ?? 'Brazil',
  away_team_name:  opts.away_team_name  ?? 'Germany',
  home_team_score: opts.home_team_score ?? 2,
  away_team_score: opts.away_team_score ?? 0,
  score:           opts.score           ?? '2–0',
});

interface GoalFixtureOptions {
  given_name?:        string;
  family_name?:       string;
  team_code?:         string;
  own_goal?:          boolean;
  minute_regulation?: number;
}

export const createGoalFixture = (opts: GoalFixtureOptions = {}) => ({
  given_name:        opts.given_name        ?? 'Ronaldo',
  family_name:       opts.family_name       ?? 'Nazário',
  team_code:         opts.team_code         ?? 'BRA',
  own_goal:          opts.own_goal          ?? false,
  minute_regulation: opts.minute_regulation ?? 67,
});

// ── NumberOfGoalsFinalQuestion setup ─────────────────────────────────────────

interface SetupNumberOfGoalsOptions {
  locale?:       Locale;
  homeScore?:    number;
  awayScore?:    number;
  wrongNumbers?: number[];
}

export const setupNumberOfGoalsQuestion = (opts: SetupNumberOfGoalsOptions = {}) => {
  const locale       = opts.locale       ?? 'en';
  const homeScore    = opts.homeScore    ?? 2;
  const awayScore    = opts.awayScore    ?? 0;
  const wrongNumbers = opts.wrongNumbers ?? [1, 3, 4];

  const match = createFinalMatchFixture({ home_team_score: homeScore, away_team_score: awayScore });
  const numberOfGoals = homeScore + awayScore;

  mockGetFinals.mockReturnValue([match]);
  mockGetRandomItem.mockReturnValue(match);
  mockShuffleArray.mockImplementation(<T>(arr: T[]) => arr);
  // randomNumber is called in a while loop to generate wrong values — seed sequentially
  wrongNumbers.forEach(n => mockRandomNumber.mockReturnValueOnce(n));

  mockGetCountryNameByI18n.mockImplementation((_: unknown, code: string) => `countries.${code}`);
  mockGetCountryName.mockImplementation((_: unknown, key: string) => {
    const code = key.replace('countries.', '');
    return getCountryName(locale, code);
  });

  return {
    t: createInterpolatingT(),
    locale,
    match,
    numberOfGoals,
    expectedHomeTeam: getCountryName(locale, match.home_team_code),
    expectedAwayTeam: getCountryName(locale, match.away_team_code),
  };
};

// ── FirstGoalScorerFinalQuestion setup ───────────────────────────────────────

interface SetupFirstGoalScorerOptions {
  locale?:       Locale;
  scorerName?:   string;
  wrongScorers?: string[];
}

export const setupFirstGoalScorerQuestion = (opts: SetupFirstGoalScorerOptions = {}) => {
  const locale       = opts.locale       ?? 'en';
  const scorerName   = opts.scorerName   ?? 'Ronaldo Nazário';
  const wrongScorers = opts.wrongScorers ?? ['Rivaldo', 'Kleberson', 'Gilberto Silva'];
  const match      = createFinalMatchFixture();
  const firstGoal  = createGoalFixture({ minute_regulation: 67 });
  const secondGoal = createGoalFixture({ given_name: 'Rivaldo',  family_name: '',       minute_regulation: 79 });
  const thirdGoal  = createGoalFixture({ given_name: 'Kleberson', family_name: '',      minute_regulation: 85 });
  const fourthGoal = createGoalFixture({ given_name: 'Gilberto',  family_name: 'Silva', minute_regulation: 89 });

  mockGoalsByMatchId.clear();
  mockGoalsByMatchId.set(match.match_id, [firstGoal, secondGoal, thirdGoal, fourthGoal]);

  mockGetFinals.mockReturnValue([match]);
  mockGetRandomItem.mockReturnValue(match);
  mockShuffleArray.mockImplementation(<T>(arr: T[]) => arr);

  // getScorerName call sequence matches the source exactly:
  // Line 79  — validGoals filter: called once per goal (4 calls)
  // Line 88  — const scorer = getScorerName(validGoals[0]) (1 call)
  // Line 103 — wrongScorers filter: called once per remaining goal (3 calls)
  // Line 104 — wrongScorers map: called once per passing goal (3 calls)
  // Total: 11 calls
  mockGetScorerName
    // validGoals filter (line 79) — all 4 goals must return truthy to pass
    .mockReturnValueOnce(scorerName)       // firstGoal  passes filter
    .mockReturnValueOnce(wrongScorers[0])  // secondGoal passes filter
    .mockReturnValueOnce(wrongScorers[1])  // thirdGoal  passes filter
    .mockReturnValueOnce(wrongScorers[2])  // fourthGoal passes filter
    // const scorer = getScorerName(validGoals[0]) (line 88)
    .mockReturnValueOnce(scorerName)
    // wrongScorers filter (line 103) — must differ from scorer
    .mockReturnValueOnce(wrongScorers[0])
    .mockReturnValueOnce(wrongScorers[1])
    .mockReturnValueOnce(wrongScorers[2])
    // wrongScorers map (line 104)
    .mockReturnValueOnce(wrongScorers[0])
    .mockReturnValueOnce(wrongScorers[1])
    .mockReturnValueOnce(wrongScorers[2])
    // safety net for any further calls
    .mockReturnValue(scorerName);

  mockGetGoals.mockReturnValue([]);

  mockGetCountryNameByI18n.mockImplementation((_: unknown, code: string) => `countries.${code}`);
  mockGetCountryName.mockImplementation((_: unknown, key: string) => {
    const code = key.replace('countries.', '');
    return getCountryName(locale, code);
  });

  mockGenerateWinnerQuestion.mockReturnValue({
    question:           'fallback question',
    options:            ['A', 'B', 'C', 'D'],
    correctAnswerIndex: 0,
    difficulty:         'easy',
    difficultyClass:    'easy',
    category:           'fallback',
  });

  return {
    t: createInterpolatingT(),
    locale,
    match,
    scorerName,
    wrongScorers,
    expectedHomeTeam: getCountryName(locale, match.home_team_code),
    expectedAwayTeam: getCountryName(locale, match.away_team_code),
  };
};