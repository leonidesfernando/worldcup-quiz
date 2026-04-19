import data from './db/tournaments.json' with { type: 'json'};
import type { Tournament } from '../types/tournament';

export const tournamentData = {
    tournaments: data.tournaments as Tournament[]
}as const;
