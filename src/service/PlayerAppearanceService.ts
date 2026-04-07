import type { PlayerAppearance } from "../types/playerAppearance";
import { Utils } from "../utils/Utils";

export class PlayerAppearanceService {

  private readonly playerAppearances: PlayerAppearance[];
  constructor(data: {playerAppearances: PlayerAppearance[]}){
    this.playerAppearances = data.playerAppearances;
  }

  getRandomPlayerAppearance(): PlayerAppearance {
    return Utils.getRandomItem(this.playerAppearances);
  }

  getAllPlayerAppearances(playerAppearance: PlayerAppearance): PlayerAppearance[] {
    return this.playerAppearances
          .filter(p => 
              p.player_id === playerAppearance.player_id &&
              p.given_name === playerAppearance.given_name &&
              p.family_name === playerAppearance.family_name
            );
  }

  /*
  getRandomPlayersAppearanceExcludingThis(playerApparence: PlayerAppearance): PlayerAppearance[] {
    return this.playerAppearances.filter(p => p != playerApparence);
  }*/

  /*getPlayersAppearanceByName(familyName:string, givenName:string) : PlayerAppearance[]{
    return this.playerAppearances
            .filter(
                p => p.family_name === familyName && 
                (Utils.isNotEmptyOrNull(givenName) ? p.given_name === givenName : true)
            );
  }*/

 }