import { GoalsData } from "../../selectors/goalsDataSelector";
import type { Goal } from "../../types/worldcup";
import { GoalService } from "../GoalService";

interface GoalDataInput {
    goals: Goal[];
}

export function createGoalService(
    data: GoalDataInput = {
        goals: GoalsData.goals
    }
): GoalService {
    return new GoalService(data);
}