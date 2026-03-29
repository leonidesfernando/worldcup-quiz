import { expect } from 'vitest';
import { LangUtils } from '../../utils/LangUtils';
import type { Translator } from '../../i18n/i18n';

export const givenCountryName = (input: {
  year: string;
  name: string;
}) => {
  return {
    whenNormalized: () => {
      const result = LangUtils.getCountyName(input.year, input.name);

      return {
        result,

        thenEquals: (expected: string) => {
          expect(result).toBe(expected);
        },

        thenUnchanged: () => {
          expect(result).toBe(input.name);
        },

        thenDoesNotContain: (value: string) => {
          expect(result.includes(value)).toBe(false);
        },
      };
    },
  };
};

export const givenTranslator = (t: Translator) => {
  return {
    whenGettingCountry: (code: string) => {
      const result = LangUtils.getCountryNameByi18n(t, code);

      return {
        thenEquals: (expected: string) => {
          expect(result).toBe(expected);
        },
      };
    },
  };
};