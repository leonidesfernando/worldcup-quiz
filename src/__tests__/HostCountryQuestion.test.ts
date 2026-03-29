import './setup/hostQuestion.mocks'

import { describe, it, expect } from 'vitest';
import { HostCountryQuestion } from '../lib/HostCountryQuestion';
import { setupHostQuestion } from './utils/setupHostQuestion';
import { SUPPORTED_LOCALES } from './i18n/locales';
import { getAllCountries, getCountryName } from './i18n/i18nTestUtils';

describe.each(SUPPORTED_LOCALES)('HostCountryQuestion [%s]', (locale) => {
  it('generates valid question structure', () => {
    const { t } = setupHostQuestion({ locale });

    const q = HostCountryQuestion.generateHostCountryQuestion(t);

    expect(q.category).toBeDefined();
    expect(q.difficulty).toBeDefined();
    expect(q.question).toBeDefined();
    expect(q.options).toHaveLength(4);
    expect(q.correctAnswerIndex).toBeGreaterThanOrEqual(0);
  });

  it('includes correct translated host', () => {
    const { t, host } = setupHostQuestion({ locale });

    const q = HostCountryQuestion.generateHostCountryQuestion(t);

    expect(q.options).toContain(
      getCountryName(locale, host.team_code)
    );
  });

  it('all options are valid localized country names', () => {
    const { t } = setupHostQuestion({ locale });

    const q = HostCountryQuestion.generateHostCountryQuestion(t);

    const valid = getAllCountries(locale);

    expect(q.options.every(opt => valid.includes(opt))).toBe(true);
  });

  it('question is properly localized (not fallback key)', () => {
    const { t } = setupHostQuestion({ locale });

    const q = HostCountryQuestion.generateHostCountryQuestion(t);

    expect(q.question).not.toBe('questions.host');
  });

  it('supports different host countries', () => {
    const { t } = setupHostQuestion({
      locale,
      hostCode: 'BRA',
    });

    const q = HostCountryQuestion.generateHostCountryQuestion(t);

    expect(q.options).toContain(
      getCountryName(locale, 'BRA')
    );
  });
});