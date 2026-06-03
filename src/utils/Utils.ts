export const Utils = {
  getFullName(name: string, lastName: string): string {
    const player = name?.trim();
    if (player != "not applicable") {
      return player + " " + lastName?.trim();
    }
    if (lastName?.trim() != "") return lastName.trim();
    return "";
  },

  getRandomItem<T>(array: T[]): T {
    if (array.length === 0) throw new Error('Empty array in getRandomItem');
    const rand = Math.random() * array.length;
    const index = Math.floor(rand % array.length);
    return array[index];
  },

  getNRandomItemsExcludingThese<T>(
  arraySrc: T[],
  nElementsToReturn: number,
  elementsToExclude: T[]
  ): T[] {
    const excludeSet = new Set(elementsToExclude);

    const filtered = arraySrc.filter(item => !excludeSet.has(item));

    const shuffled = this.shuffleArray(filtered);
    return shuffled.slice(0, nElementsToReturn);
  },

  getRandomNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Generates a random integer within the inclusive range [min, max],
   * excluding a specific value.
   *
   * If the generated number matches the excluded value, the function
   * will retry until a valid number is produced.
   *
   * @param exclude - The number to be excluded from the result.
   * @param min - The minimum value of the range (inclusive).
   * @param max - The maximum value of the range (inclusive).
   * @returns A random integer between min and max (inclusive), excluding the specified value.
   *
   * @throws {Error} If min is greater than max.
   * @throws {Error} If the range contains only one value and it is the excluded number.
   *
   * @example
   * // Returns a random number between 1 and 10, excluding 3
   * const num = randomNumber(3, 1, 10);
   * // Possible outputs: 1,2,4,5,6,7,8,9,10
   */
  randomNumber(exclude: number, min: number, max: number): number {
    if (min > max) {
      throw new Error('min cannot be greater than max');
    }
    if (min === max && min === exclude) {
      throw new Error('No valid numbers available');
    }
    let num: number;

    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (num === exclude);
    return num;
  },

  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
  addWrongOptions(uniqueWrong: string[], t: (key: string, params?: Record<string, any>) => string): string[] {
    const wrongOptions = [t('quiz.unknownScorer'), t('quiz.noScorer'), t('quiz.someoneElse')];
    return [...uniqueWrong, ...wrongOptions].slice(0, 3);
  },

  getYearByTournamentId(tournamentId: string): string {
    return tournamentId?.replace('WC-', '');
  },

  isNotEmptyOrNull(value?: string | null): boolean {
    return (typeof value === 'string' && value.trim().length > 0);
  },

  /**
   * Verify if the informed country is on country created after second war
   * @param name 
   * @returns 
   */
  containsPosSecondWarCountryName(name: string): boolean {
    const postSecondWarNames = getCountryNamesPosSecondWar();
    const lowerName = name.toLowerCase();

    return postSecondWarNames.some(term =>
      lowerName.includes(term.toLowerCase())
    );
  },

};

function getCountryNamesPosSecondWar(): string[] {
    return [
      // --- German split ---
      // English
      "West", "East",

      // Portuguese
      "Ocidental", "Oriental",

      // Spanish
      "Occidental", "Oriental",

      // French
      "de l'Ouest", "de l'Est",

      // German
      "Westdeutschland", "Ostdeutschland",

      // Polish (you already had one)
      "Zachodnie", "Wschodnie",

      // --- Soviet Union ---
      // English
      "Soviet",
      // Portuguese
      "União",
      // Spanish
      "Unión",
      // French
      "Union",
      // German
      "Sowjetunion",

      // --- Yugoslavia ---
      // English
      "Yugoslavia",
      // Portuguese
      "Iugoslávia",
      // Spanish
      "Yugoslavia",
      // French
      "Yougoslavie",
      // German
      "Jugoslawien",
      // --- Czechoslovakia ---
      // English
      "Czechoslovakia",
      // Portuguese
      "Checoslováquia",
      // Spanish
      "Checoslovaquia",
      // French
      "Tchécoslovaquie",
      // German
      "Tschechoslowakei",
    ];
  }