import type { PlayerAppearance } from './../types/playerAppearance';
import { Utils } from './Utils';

export const PlayerAppearanceUtils = {


    getPlayerName(playerAppearance: PlayerAppearance): string {
        const givenName = playerAppearance.given_name;
        if (!Utils.isNotEmptyOrNull(givenName) || givenName.toLowerCase() === 'not applicable') {
            return playerAppearance.family_name;
        }
        return `${playerAppearance.given_name} ${playerAppearance.family_name}`;
    },

    /**
     * Returns all player appearances which the player has played for countries names pos II war
     * @param playAppearance 
     * @param allPlayerAppearances 
     * @returns 
     */
    getPlayAppearancesWithPosSecondWarCountryName(playAppearance: PlayerAppearance, allPlayerAppearances: PlayerAppearance[]): PlayerAppearance[] {
        return allPlayerAppearances.filter(p => playAppearance.player_id === p.player_id && Utils.containsPosSecondWarCountryName(p.team_name));
  }
}