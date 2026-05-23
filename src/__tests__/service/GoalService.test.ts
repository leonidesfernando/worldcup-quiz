import { describe, expect, it } from "vitest";
import { createGoalService } from "../../service/factory/GoalServiceFactory";


describe('GoalService', () => {
    const service = createGoalService();
    it('Only Men goals', () => {
        const goals = service.getGoals()
                        .filter(s => s.tournament_name.includes("Women"));
        console.log('goals: ', goals)
        expect(goals).toHaveLength(0);
 
    })
})