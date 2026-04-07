// src/lib/__tests__/HostCountryQuestion.test.ts
import { describe, it } from 'vitest';

describe('To be deleted', () => {
    it('To be removed', () => {
        
    })
});
/*import { HostCountryQuestion } from '../HostCountryQuestion';
import type { QuizQuestion } from '../../types/QuizQuestion';

// Mocks
vi.mock('../../service/HostService', () => ({
    HostService: class {
        getRandomHost() {
            return {
                tournament_id: 'WC-2018',
                team_code: 'RUS',
            };
        }
    },
}));

vi.mock('../../service/factory/MatchesServiceFactory', () => ({
    createMatchesService: vi.fn().mockReturnValue({
        getOtherCountryCodes: vi.fn().mockReturnValue(['BRA', 'GER', 'FRA', 'ARG']),
    }),
}));

vi.mock('../utils/Utils', () => ({
    Utils: {
        getYearByTournamentId: vi.fn().mockReturnValue('2018'),
    },
}));

vi.mock('../../utils/LangUtils', () => ({
    LangUtils: {
        getCountyName: vi.fn((_, name: string) => {
            const names: Record<string, string> = {
                RUS: 'Russia',
                BRA: 'Brazil',
                GER: 'Germany',
                FRA: 'France',
                ARG: 'Argentina',
            };
            const code = name.replace('countries.', '');
            return names[code] || name;
        }),
        getCountryNameByi18n: vi.fn((_, code: string) => `countries.${code}`),
    },
}));

describe('HostCountryQuestion.generateHostCountryQuestion', () => {
    const mockT = vi.fn((key: string, params?: Record<string, any>) => {
        if (key === 'questions.host') {
            return `Which country hosted the World Cup in ${params?.year}?`;
        }
        return key;
    });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('generates a valid host country question with correct structure', () => {
        const question: QuizQuestion = HostCountryQuestion.generateHostCountryQuestion(mockT);

        expect(question).toMatchObject({
            question: expect.stringContaining('2018'),
            options: expect.arrayContaining([expect.any(String)]),
            correctAnswerIndex: expect.any(Number),
            difficulty: 'easy',
            category: 'Hosts',
        });

        expect(question.options).toHaveLength(4);
    });

    it('includes the correct host country name ("Russia") in the options', () => {
        const question = HostCountryQuestion.generateHostCountryQuestion(mockT);
        expect(question.options).toContain('Russia');
    });

    it('includes translated names for all wrong hosts', () => {
        const question = HostCountryQuestion.generateHostCountryQuestion(mockT);

        // Correct way to check partial content with random order
        expect(question.options).toHaveLength(4);

        expect(question.options.every(opt =>
            ['Russia', 'Brazil', 'Germany', 'France', 'Argentina'].includes(opt)
        )).toBe(true);
    });

    it('shuffles options so correct answer appears in random position', () => {
        const positions = new Set<number>();
        for (let i = 0; i < 20; i++) {
            const q = HostCountryQuestion.generateHostCountryQuestion(mockT);
            positions.add(q.correctAnswerIndex);
        }
        expect(positions.size).toBeGreaterThan(1);
    });
});*/