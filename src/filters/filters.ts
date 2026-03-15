// filters.ts
const WOMEN = 'Women';

export const isMensTournament = (tournamentName?: string) =>
  !tournamentName?.includes(WOMEN);

export const randomSort = () => Math.random() - 0.5;