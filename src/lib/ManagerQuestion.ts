// src/lib/ManagerQuestion.ts
import type { Translator } from "../i18n/i18n";
import type { QuizQuestion } from "../types/QuizQuestion";
import { Utils } from "../utils/Utils";
import { LangUtils } from "../utils/LangUtils";
import { createManagerAppearanceService } from '../service/factory/ManagerAppearanceServiceFactory';
import type { ManagerAppearance } from '../types/managerAppearance';




const managerAppearanceService = createManagerAppearanceService();

export const ManagerQuestion = {

    /** Who managed [Team] in the [Year] World Cup? */
    generateManagerOfTeamInWorldCup(t: Translator): QuizQuestion {
        const appearance = managerAppearanceService.getRandomManagerAppearance();
        const year = Utils.getYearByTournamentId(appearance.tournament_id);
        const teamName = LangUtils.getCountyName(year, LangUtils.getCountryNameByi18n(t, appearance.team_code));

        //Managing a edge case for 1930
        const secondArgentianCoach = getSecondArgentianCoachIfNeeded(appearance, year);

        const correctManager = Utils.getFullName(appearance.given_name, appearance.family_name) + secondArgentianCoach;

        // Generate smart wrong options
        const wrongManagers = generateSmartWrongManagers(correctManager, appearance, 3);

        const options = Utils.shuffleArray([correctManager, ...wrongManagers]);

        return {
            question: t('questions.managerOfTeam', { teamName, year }),
            options,
            correctAnswerIndex: options.indexOf(correctManager),
            difficulty: t('quiz.difficultyHard'),//'medium',
            difficultyClass: 'hard',
            category: t('quiz.categoryManagers'),
        };
    },
};


/**
 * *Edge case* Helper to return the second Argentian code on 1930
 * @param appearance - One of the fouind managers
 * @param year - year selected
 * @returns second Argentian coach if the year is 1930 and the team is Argentina
 */
function getSecondArgentianCoachIfNeeded(appearance: ManagerAppearance, year: string): string {
    let secondArgentianCoach = '';
    if (year === '1930' && appearance.team_code === 'ARG') {
        let key = 9;
        const keys = [9,22,31,34,40]
        if (keys.includes(appearance.key_id)) {
            key++;
        }
        const secondCoach = managerAppearanceService.getByKeyId(key);
        secondArgentianCoach = ', ' + Utils.getFullName(secondCoach.given_name, secondCoach.family_name);
    }
    return secondArgentianCoach;
}

// Helper function to generate intelligent wrong answers
function generateSmartWrongManagers(
    correctName: string,
    currentAppearance: ManagerAppearance,
    count: number
): string[] {
    const wrongs = new Set<string>();

    // 1. Same team, different tournaments
    const sameTeamOtherYears = managerAppearanceService.getManagerAppearancesByTeam(currentAppearance.team_code)
        .filter(m => m.tournament_id !== currentAppearance.tournament_id)
        .map(m => Utils.getFullName(m.given_name, m.family_name))
        .filter(name => name !== correctName);

    sameTeamOtherYears.forEach(name => wrongs.add(name));

    // 2. Same country, different managers
    const sameCountryManagers = managerAppearanceService.getManagersByCountry(currentAppearance.country_name)
        .map(m => Utils.getFullName(m.given_name, m.family_name))
        .filter(name => name !== correctName);

    sameCountryManagers.forEach(name => wrongs.add(name));


    // 3. Recombined names — keep one real part, swap the other from the pool.
    //    Always produces results regardless of DB content, and every output
    //    looks like a plausible real name because all parts come from real data.
    buildNameRecombinations(currentAppearance, correctName, wrongs, 5)
        .forEach(name => wrongs.add(name));


    // 4. Fill with random famous managers if needed
    while (wrongs.size < count + 5) {
        const randomManager = managerAppearanceService.getRandomManagerAppearance();
        const name = Utils.getFullName(randomManager.given_name, randomManager.family_name);
        if (name !== correctName) wrongs.add(name);
    }

    return Array.from(wrongs).slice(0, count);
}


// Helper: build a full name string from a manager appearance
/*function toFullName(m: { given_name: string; family_name: string }): string {
  return `${m.given_name} ${m.family_name}`.trim();
}*/

/**
 * Constructs plausible-but-wrong names by recombining parts of the correct
 * name with parts sourced from other real managers in the pool.
 *
 * Strategy:
 *   - Keep the given name, swap the family name with a real one from the pool
 *   - Keep the family name, swap the given name with a real one from the pool
 *
 * This guarantees results regardless of whether any manager in the DB
 * happens to share a name token with the correct name.
 * The output always looks like a real person's name because every part
 * comes from real data — it's just recombined.
 *
 * Example: correctName = "Carlos Alberto Parreira"
 *   given_name  = "Carlos Alberto"
 *   family_name = "Parreira"
 *
 *   → Keep given, swap family: "Carlos Alberto Silva"   (family from pool)
 *   → Keep family, swap given: "João Parreira"          (given from pool)
 */
function buildNameRecombinations(
    correctAppearance: ManagerAppearance,
    correctName: string,
    exclude: Set<string>,
    maxResults: number,
): string[] {
    const allManagers = managerAppearanceService.getAllManagerAppearances();

    // Shuffle so we don't always pick the same pool entries
    const shuffled = Utils.shuffleArray(allManagers);

    const results = new Set<string>();

    for (const other of shuffled) {
        if (results.size >= maxResults) break;

        // Variant A: keep correct given name, take family name from pool entry
        //const keepGiven = `${correctAppearance.given_name} ${other.family_name}`.trim();
        const keepGiven = `${getGivenName(correctAppearance.given_name)} ${other.family_name}`.trim();
        //TODO: add a faker to generate name and last name acording to the country/locale

        // Variant B: take given name from pool entry, keep correct family name
        //const keepFamily = `${other.given_name} ${correctAppearance.family_name}`.trim();
        const keepFamily = `${getGivenName(other.given_name)} ${correctAppearance.family_name}`.trim();

        for (const candidate of [keepGiven, keepFamily]) {
            if (
                candidate !== correctName &&
                !exclude.has(candidate) &&
                results.size < maxResults
            ) {
                results.add(candidate);
            }
        }
    }

    return Array.from(results);
}

function getGivenName(givenName: string): string {
    return "not applicable" === givenName ? "" : givenName;
}