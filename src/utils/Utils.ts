export const Utils = {
  getFullPlayerName(name: string, lastName: string): string {
    const player = name?.trim();
    if (player != "not applicable") {
      return player + " " + lastName?.trim();
    }
    if (lastName?.trim() != "") return lastName.trim();
    return "";
  },
  
  getRandomItem<T>(array: T[]): T {
    if (array.length === 0) throw new Error('Empty array in getRandomItem');
    return array[Math.floor(Math.random() * array.length)];
  },

  getRandomNumberInRange(min:number, max:number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
  addWrongOptions(uniqueWrong: string[], t: (key: string, params?: Record<string, any>) => string): string[]{
      const wrongOptions = [t('quiz.unknownScorer'), t('quiz.noScorer'), t('quiz.someoneElse')];
      return [...uniqueWrong, ...wrongOptions].slice(0, 3);
  },

  getYearByTournamentId(tournamentId:string): string {
    return tournamentId?.replace('WC-', '');
  }

};
