// src/data/worldcup.ts
import { Constants } from '../utils/Constants';
import data from './db/worldcup.json' with { type: 'json'};

import type { Match, Goal, Tournament, AwardWinners, PlayerApparences } from '../types/worldcup';


/*
Singleton service (if you prefer a class)
class WorldCupService {
  private static data: any; // you must type it 

  static async getData() {
    if (!this.data) {
      this.data = (await import('../../public/data/worldcup.json', {
        assert: { type: 'json' }
      })).default;
    }
    return this.data;
  }
}

export default WorldCupService;
*/

export const worldCupData = {
  matches: data.matches as Match[],
  goals: data.goals as unknown as Goal[],   // double assertion bypasses strict check
  tournaments: data.tournaments as Tournament[], // ← now matches real structure
  awardWinners: data.award_winners as AwardWinners[],
  playerApparences: data.player_appearances as PlayerApparences[]
  // add any other arrays you want later (team_appearances, awards, etc.)
} as const;

// Fast lookups (still useful)
export const matchesById = new Map(
  worldCupData.matches.map(m => [m.match_id, m])
);

export const goalsByMatchId = new Map<string, Goal[]>(
  worldCupData.goals
  .filter(g => !g.tournament_name.includes(Constants.WOMEN))
  .reduce((acc, goal) => {
    if (!acc.has(goal.match_id)) acc.set(goal.match_id, []);
    acc.get(goal.match_id)!.push(goal);
    return acc;
  }, new Map<string, Goal[]>())
);

// Helper examples (still work perfectly)
export function getTournamentByYear(year: number) {
  return worldCupData.tournaments
  .filter(t => !t.tournament_name.includes(Constants.WOMEN))
  .find(t => t.year === year);
}

export function getFinals() {
  return worldCupData.matches
  .filter(m => !m.tournament_name.includes(Constants.WOMEN))
  .filter(m => 
    m.stage_name?.toLowerCase() === 'final'
  );
}

// Example: lazy load + cache
let cachedData: any = null;

export async function loadWorldCupData() {
  if (cachedData) return cachedData;

  try {
    const response = await fetch('/data/worldcup.json');
    cachedData = await response.json();
    // Optional: save to IndexedDB for future offline loads
  } catch (err) {
    console.error('Failed to load data', err);
  }
  return cachedData;
}