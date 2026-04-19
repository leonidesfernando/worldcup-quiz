
import data from './db/goals.json' with  {type: 'json'};
import type { Goal } from '../types/worldcup';

export const goalsData = {
    goals: data.goals as Goal[]
} as const;