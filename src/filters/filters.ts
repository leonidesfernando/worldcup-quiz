// filters.ts
import type { Match } from './../types/worldcup';
const WOMEN = 'Women';

export const isMensTournament = (tournamentName?: string) =>
  !tournamentName?.includes(WOMEN);

export const randomSort = () => (Math.random() - 0.5);

export const isStage = (match: Match, stageName: string) => match.stage_name === stageName;