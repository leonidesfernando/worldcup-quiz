// src/service/QuestionPoolService.ts
import type { QuizQuestion } from '../types/QuizQuestion';
import type { Translator } from '../i18n/i18n';
import { generateRandomQuestion } from '../lib/questionGenerator';
import { questionGenerators } from '../lib/questionGeneratorsList';
import { Utils } from '../utils/Utils';
import { Constants } from '../utils/Constants';


const CURSOR_KEY = 'worldcup_question_cursor_v2';
const LANGUAGE_KEY = 'lang';
const LOCALE_KEY = 'locale';

export class QuestionPoolService {
  private static pool: QuizQuestion[] = [];
  private static cursor = 0;
  private static poolLanguage = 'en';

  static loadPool(t: Translator, currentLang: string): QuizQuestion[] {
    try {
      const savedPool = localStorage.getItem(Constants.QUESTION_POOL_KEY);
      const savedCursor = localStorage.getItem(CURSOR_KEY);
      const savedPoolLanguage = localStorage.getItem(LOCALE_KEY);

      if (savedPool) this.pool = JSON.parse(savedPool);
      if (savedCursor) this.cursor = Number.parseInt(savedCursor, 10);
      if(savedPoolLanguage) this.poolLanguage = savedPoolLanguage;
    } catch (e) {
      console.warn('Failed to load pool, starting fresh', e);
    }

    if (this.poolLanguage.toLocaleLowerCase() !== currentLang.toLocaleLowerCase() || this.isPoolSmall()) {
      return this.generateNewPool(t, currentLang);
    }

    return this.pool;
  }


static generateNewPool(t: Translator, lang: string): QuizQuestion[] {
    const pool: QuizQuestion[] = [];
    const seen = new Set<string>();

    console.log('🔄 Generating new question pool...');

    let attempts = 0;
    const maxAttempts = Constants.QUESTIONS_POOL_SIZE * 4; // safety limit

    console.log(`🔄 Generating new question pool for language: ${lang}`);

    while (pool.length < Constants.QUESTIONS_POOL_SIZE && attempts < maxAttempts) {
      attempts++;
      try {
        const q = generateRandomQuestion(t, Utils.shuffleArray(questionGenerators));

        if (q.question && !seen.has(q.question)) {
          seen.add(q.question);
          pool.push(q);
        }
      } catch (err) {
        console.warn('Failed to generate question during pool creation', err);
      }
    }

    const minPoolLength = Constants.NUMBER_OF_QUESTIONS_PER_ROUND * 3;
    if (pool.length < minPoolLength) {
      console.error('❌ Failed to generate sufficient unique questions');
    }

    this.pool = pool;
    this.cursor = 0;
    this.poolLanguage = lang;
    this.save();
    console.log(`✅ New pool created (${pool.length} questions) for ${lang}`);
    return pool;
  }


  static getNextRound(t: Translator, lang: string): QuizQuestion[] {

    if (this.isPoolSmall()) {
        this.generateNewPool(t,lang);
    }

    const end = Math.min(this.cursor + Constants.NUMBER_OF_QUESTIONS_PER_ROUND, this.pool.length);
    const round = this.pool.slice(this.cursor, end);

    this.cursor = end;
    this.saveCursor();
    
    return round;
  }

  private static saveCursor() {
    try {
      console.log('Saving cursor ', this.cursor);
      localStorage.setItem(CURSOR_KEY, this.cursor.toString());
    } catch (e) {
      console.warn('Failed to save cursor', e);
    }
  }

  private static save() {
    try {
      localStorage.setItem(Constants.QUESTION_POOL_KEY, JSON.stringify(this.pool));
      localStorage.setItem(CURSOR_KEY, this.cursor.toString());
      localStorage.setItem(LANGUAGE_KEY, this.poolLanguage);
      localStorage.setItem(LOCALE_KEY, this.poolLanguage.toUpperCase());
    } catch (e) {
      console.warn('Failed to save pool and cursor', e);
    }
  }

  static clearPool() {
    this.pool = [];
    this.cursor = 0;
    localStorage.removeItem(Constants.QUESTION_POOL_KEY);
    localStorage.removeItem(CURSOR_KEY);
  }

  private static isPoolSmall(): boolean {
    const doubleNumerOfQuetions = Constants.NUMBER_OF_QUESTIONS_PER_ROUND * 2;
    return (this.pool.length < doubleNumerOfQuetions || this.cursor >= (this.pool.length - Constants.NUMBER_OF_QUESTIONS_PER_ROUND));
  }

  // used on the unit tests
  static getRemainingCount(): number {
    return Math.max(0, this.pool.length - this.cursor);
  }
}