import { describe, it, expect } from 'vitest';

import en from '../i18n/en.json';
import fr from '../i18n/fr.json';
import de from '../i18n/de.json';
import es from '../i18n/es.json';
import pl from '../i18n/pl.json';
import br from '../i18n/pt-BR.json'


type TranslationObject = {
  [key: string]: string | TranslationObject;
};

const flattenKeys = (obj: TranslationObject, prefix = ''): string[] =>
  Object.keys(obj).reduce((acc: string[], key: string) => {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null) {
      return acc.concat(flattenKeys(value, fullKey));
    }

    return acc.concat(fullKey);
  }, []);


describe('i18n consistency', () => {
  const baseKeys = flattenKeys(en).sort();

  const languages = { fr, de, es, br, pl };

  Object.entries(languages).forEach(([lang, data]) => {
    it(`${lang} has the same keys as en`, () => {
      const keys = flattenKeys(data).sort();

      const missing = baseKeys.filter(k => !keys.includes(k)).sort();
      const extra = keys.filter(k => !baseKeys.includes(k)).sort();

      if (missing.length || extra.length) {
        let errorMessage = '';
        if (missing.length) {
          errorMessage = `\n❌ Missing keys in ${lang}:\n${missing.map(k => `  - ${k}`).join('\n')}`
        }

        if (extra.length) {
          errorMessage += `\n❌ Extra keys in ${lang}:\n${extra.map(k => `  - ${k}`).join('\n')}`;
        }

        throw new Error(`i18n mismatch for ${lang}: ` + errorMessage);
      }

      expect(true).toBe(true);
    });
  });
});