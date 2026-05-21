
import data from "./db/squads.json" with { type: 'json'};
import type { Squad } from "../types/squad";

export const squadsData = {
    squads: data.squads as Squad[]
} as const;