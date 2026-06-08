// src/__tests__/service/QuestionPoolService.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QuestionPoolService } from '../../service/QuestionPoolService';
import type { QuizQuestion } from '../../types/QuizQuestion';
import type { Translator } from '../../i18n/i18n';
import * as questionGenerator from '../../lib/questionGenerator';
import { SUPPORTED_LOCALES } from '../i18n/locales';
import { Constants } from '../../utils/Constants';

const mockT = vi.fn((key: string) => key) as Translator;

const createMockQuestion = (id: number): QuizQuestion => ({
  question: `Unique Question ${id}`,
  options: ['A', 'B', 'C', 'D'],
  correctAnswerIndex: 0,
  difficulty: 'easy',
  category: 'Test',
});

// Simple top-level mocks
vi.mock('../../lib/questionGenerator', () => ({
  generateRandomQuestion: vi.fn(),
}));

vi.mock('../../lib/questionGeneratorsList', () => ({
  questionGenerators: [],
}));

vi.mock('../../utils/Utils', () => ({
  Utils: {
    shuffleArray: (arr: any[]) => [...arr],
  },
}));
vi.mock('../../lib/questionGenerator')

describe.each(SUPPORTED_LOCALES)('QuestionPoolService [%s]', (lang) => {
  let questionCounter = 1;

  beforeEach(() => {
    vi.clearAllMocks();
    QuestionPoolService.clearPool();
    localStorage.clear();
    questionCounter = 1;

    vi.mocked(questionGenerator.generateRandomQuestion)
      .mockImplementation(() => createMockQuestion(questionCounter++));
  });

  afterEach(() => {
    localStorage.clear();
  });


  it(`generates a new pool with unique questions in: ${lang}`, () => {
    const pool = QuestionPoolService.generateNewPool(mockT, lang);
    expect(pool.length).toBe(Constants.QUESTIONS_POOL_SIZE);
  });

  it(`loads pool from localStorage correctly in: ${lang}`, () => {
    const mockPool = [createMockQuestion(1), createMockQuestion(2)];
    localStorage.setItem(Constants.QUESTION_POOL_KEY, JSON.stringify(mockPool));

    const loaded = QuestionPoolService.loadPool(mockT, lang);
    expect(loaded.length).toBe(Constants.QUESTIONS_POOL_SIZE);
  });

  it(`handles corrupted localStorage gracefully in: ${lang}`, () => {
    localStorage.setItem(Constants.QUESTION_POOL_KEY, 'invalid json');

    const pool = QuestionPoolService.loadPool(mockT, lang);
    expect(pool.length).toBe(Constants.QUESTIONS_POOL_SIZE);
  });

  it(`returns ${Constants.NUMBER_OF_QUESTIONS_PER_ROUND} questions per round in: ${lang}`, () => {
    QuestionPoolService.generateNewPool(mockT, lang);
    const round = QuestionPoolService.getNextRound(mockT, lang);
    expect(round.length).toBe(Constants.NUMBER_OF_QUESTIONS_PER_ROUND);
  });

  it(`clearPool works correctly in: ${lang}`, () => {
    QuestionPoolService.generateNewPool(mockT, lang);
    expect(QuestionPoolService.getRemainingCount()).toBeGreaterThan(0);

    QuestionPoolService.clearPool();
    expect(QuestionPoolService.getRemainingCount()).toBe(0);
  });

});