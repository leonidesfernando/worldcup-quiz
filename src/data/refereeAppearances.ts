import type { RefereeAppearances } from "../types/refereeAppearances";
import data from './db/referee_appearances.json' with {type: 'json'};

export const refereeAppearanceData = {
    refereesAppearnces: data.referees as RefereeAppearances[]
} as const;
