import type { Goal } from "../types/worldcup";
import { Utils } from "./Utils";

export const GoalUtils = {
    getScorerName(goal: Goal): string{
        return Utils.getFullPlayerName(goal.given_name, goal.family_name);
    }
}
