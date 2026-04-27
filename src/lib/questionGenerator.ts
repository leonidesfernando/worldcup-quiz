// src/lib/questionGenerator.ts
import type { Translator } from '../i18n/i18n';
import type { QuizQuestion } from '../types/QuizQuestion';
import { Utils } from '../utils/Utils';

export function generateRandomQuestion(
  t: Translator,
  generators: Array<(t: Translator) => QuizQuestion>,  // ← remove typeof here — it's causing cycle
): QuizQuestion {
  for (let attempt = 0; attempt < 10; attempt++) {
    const generator = Utils.getRandomItem(generators);

    try {
      return generator(t);
    } catch (err) {
      console.warn(`Question generation attempt ${attempt + 1} failed`, err);
    }
  }

  console.warn('All attempts failed – using fallback');
  // Safest fallback: first generator (usually WinnerQuestion)
  return generators[0]?.(t) ?? {
    question: t('error.fallbackQuestion') || 'Error generating question',
    options: ['Error'],
    correctAnswerIndex: 0,
    difficulty: 'impossible',
    category: 'Error',
  };
}
