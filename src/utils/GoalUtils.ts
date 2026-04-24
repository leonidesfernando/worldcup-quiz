import type { Goal } from "../types/worldcup";
import { Utils } from "./Utils";

export const GoalUtils = {
    getScorerName(goal: Goal): string {
        return Utils.getFullName(goal?.given_name, goal?.family_name);
    },

    /**
     * Shared helper to generate wrong number options
     */

    /**
     * Geenerate the wrong number of goals as option, excluding the correct number
     * @param correctValue - correct number of goals
     * @param maxWrong - max number of wrong optons
     * @returns array of options with the correct and wrong option
     */

    generateWrongGoalNumbers(
        correctValue: number,
        maxWrong: number = 3
    ): number[] {
        const wrongSet = new Set<number>();

        const maxRange = Math.max(correctValue + Math.floor(correctValue * 0.3) + 2, maxWrong + 1);

        // Add some numbers around and above the correct value
        while (wrongSet.size < maxWrong) {
            const candidate = Utils.randomNumber(correctValue, 0, maxRange);
            wrongSet.add(candidate);
        }
        return Array.from(wrongSet).slice(0, maxWrong);
    }
}
