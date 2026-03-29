import { describe, it, expect } from 'vitest';
import { LangUtils } from '../utils/LangUtils';
import { givenCountryName, givenTranslator } from './utils/langUtils.dsl';
import { SUPPORTED_LOCALES } from './i18n/locales';
import { getCountryName } from './i18n/i18nTestUtils';

describe('LangUtils.getCountryNameByi18n', () => {
  it('calls translator with correct key', () => {
    const t = (key: string) => key;

    givenTranslator(t)
      .whenGettingCountry('BRA')
      .thenEquals('countries.BRA');
  });

  describe.each(SUPPORTED_LOCALES)(
    'returns correct translation for each supported lang. Now for lang: (%s)',
    (locale) => {
      it('returns translated country name', () => {
        const t = (key: string) => {
          const code = key.replace('countries.', '');
          return getCountryName(locale, code);
        };

        const result = LangUtils.getCountryNameByi18n(t, 'BRA');

        expect(result).toBe(getCountryName(locale, 'BRA'));
      });
    }
  );
});

describe('LangUtils edge cases', () => {
  it('removes multiple patterns at once', () => {
    const result = LangUtils.getCountyName(
      '2018',
      "Westdeutschland Occidental"
    );

    expect(result).not.toContain('West');
    expect(result).not.toContain('Occidental');
  });

  it('does not break unrelated names', () => {
    const result = LangUtils.getCountyName(
      '2018',
      'Brazil'
    );

    expect(result).toBe('Brazil');
  });
});

describe('LangUtils.getCountyName', () => {
  it('removes historical prefixes after 1990', () => {
    givenCountryName({
      year: '2018',
      name: 'Westdeutschland',
    })
      .whenNormalized()
      .thenEquals('Deutschland');
  });

  it('removes multiple language variants', () => {
    givenCountryName({
      year: '2018',
      name: "Allemagne de l'Ouest",
    })
      .whenNormalized()
      .thenDoesNotContain("Ouest");
  });

  it('trims leftover spaces', () => {
    givenCountryName({
      year: '2018',
      name: 'West Germany ',
    })
      .whenNormalized()
      .thenEquals('Germany');
  });

  it('does NOT modify names or equal 1990', () => {
    givenCountryName({
      year: '1990',
      name: 'West Germany',
    })
      .whenNormalized()
      .thenUnchanged();
  });

  it('does NOT modify names before 1990', () => {
    givenCountryName({
      year: '1986',
      name: 'West Germany',
    })
      .whenNormalized()
      .thenUnchanged();
  });

  it('handles invalid year safely (NaN)', () => {
    const result = LangUtils.getCountyName('invalid', 'West Germany');

    expect(result).toBe('West Germany');
  });
});