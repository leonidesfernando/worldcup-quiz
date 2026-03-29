import type { Translator } from './../i18n/i18n';
export const LangUtils = {
    getCountyName(year: string, countryName: string): string {
        const yearNumber = Number.parseInt(year.trim(), 10);

        if (yearNumber > 1990) {
            return countryName
                .replaceAll("Westdeutschland", "Deutschland")
                .replaceAll("West", "")
                .replaceAll("Oriental", "")
                .replaceAll("Zachodnie", "")
                .replaceAll("de l'Ouest", "")
                .replaceAll("Occidental", "")
                .replaceAll("Ocidental", "")
                .trim();
        }
        return countryName;
    },

    getCountryNameByi18n(t: Translator, code: string): string {
        return t(`countries.${code}`);
    }
}