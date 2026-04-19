// src/service/TournamentServiceFactory.ts

import { tournamentData } from "../../data/tournament";
import type { Tournament } from "../../types/tournament";
import {TournamentService} from '../TournamentService';

interface TournamentDataInput {
    tournaments: Tournament[];
}

export function createTournamentService(
    data: TournamentDataInput = {
        tournaments: tournamentData.tournaments
    }
): TournamentService {
    return new TournamentService(data);
}