import type { Tournament } from '../types/tournament';
import { Utils } from '../utils/Utils';

export class TournamentService {

    private readonly tournaments: Tournament[];

    constructor(data: { tournaments: Tournament[] }) {
        this.tournaments = data.tournaments;
    }

    getTournamentById(tournamentId: string): Tournament {
        const tournament = this.tournaments.find(t => t.tournament_id === tournamentId);
        if (!tournament) {
            throw new Error(`Tournament with id ${tournamentId} not found`);
        }
        return tournament;
    }

    getRandomTournament(): Tournament {
        return Utils.getRandomItem(this.tournaments);
    }
}