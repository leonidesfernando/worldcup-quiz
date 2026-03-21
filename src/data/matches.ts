import data from '../../public/data/matches.json' assert { type: 'json' };
import type { Match } from '../types/worldcup';


export const matchData = {
  matches: data.matches as Match[],
} as const;

