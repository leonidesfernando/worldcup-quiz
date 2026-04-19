import { goalsData } from "../../data/goals";
import type { Goal } from "../../types/worldcup";
import { GoalService } from "../GoalService";

interface GoalDataInput {
    goals: Goal[];
}

export function createGoalService(
    data: GoalDataInput = {
        goals: goalsData.goals
    }
): GoalService {
    return new GoalService(data);
}