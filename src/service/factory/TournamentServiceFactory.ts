// src/service/TournamentServiceFactory.ts
import { TournamentData } from "../../selectors/tournamentSelector";
import type { Tournament } from "../../types/tournament";
import {TournamentService} from '../TournamentService';

interface TournamentDataInput {
    tournaments: Tournament[];
}

export function createTournamentService(
    data: TournamentDataInput = {
        tournaments: TournamentData.tournaments
    }
): TournamentService {
    return new TournamentService(data);
}