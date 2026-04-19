import { isMensTournament, randomSort } from './../filters/filters';
import { tournamentData } from "../data/tournament";


export const TournamentData = {
    tournaments: tournamentData.tournaments
                    .filter(t => isMensTournament(t.tournament_name))
                    .sort(randomSort)
};