import rawData from '../../public/data/player_appearances.json' assert { type: 'json' };
import type { PlayerAppearance } from '../types/playerAppearance';

type PlayerAppearancesJson = {
  player_appearances: PlayerAppearance[];
};

const data = rawData as PlayerAppearancesJson;

export const playerAppearancesData = {
  playerAppearances: data.player_appearances,
} as const;