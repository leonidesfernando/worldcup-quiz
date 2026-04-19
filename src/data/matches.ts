import data from './db/matches.json' with { type: 'json'};
import type { Match } from '../types/worldcup';


export const matchData = {
  matches: data.matches as Match[],
} as const;

