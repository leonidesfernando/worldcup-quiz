import type { Translator } from './../i18n/i18n';
import { Constants } from './Constants';
export const LangUtils = {
    getCountyName(year: string, countryName: string): string {
        const yearNumber = Number.parseInt(year.trim(), 10);

        if (yearNumber <= 1990) {
            return countryName;
        }
        const normalized = countryName.trim();
        return Constants.countriesMap[normalized] ?? normalized;
    },

    getCountryNameByi18n(t: Translator, code: string): string {
        return t(`countries.${code}`);
    }
}