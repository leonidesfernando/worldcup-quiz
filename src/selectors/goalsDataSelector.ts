import { randomSort } from './../filters/filters';
import { goalsData } from "../data/goals";
import { isMensTournament } from "../filters/filters";


export const GoalsData = {
    goals: goalsData.goals
        .filter(g => isMensTournament(g.tournament_name))
        .sort(randomSort)
};