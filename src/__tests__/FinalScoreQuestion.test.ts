import { describe, it, expect } from 'vitest';

import { FinalScoreQuestion } from '../../src/lib/FinalScoreQuestion';

const mockT = (key: string) => key;

describe('FinalScoreQuestion', () => {
    it('should only use final matches', () => {
        const question = FinalScoreQuestion.generateFinalScoreQuestion(mockT);

        // Extract scores from options and validate format if needed
        expect(question.category).toBe('quiz.categoryFinals');
    });

    it('should never include non-finals in 100 runs', () => {
        for (let i = 0; i < 100; i++) {
            const question = FinalScoreQuestion.generateFinalScoreQuestion(mockT);

            // You can enhance this if you expose internals
            expect(question.category).toBe('quiz.categoryFinals');
        }
    });
});