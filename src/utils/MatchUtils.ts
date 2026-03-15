import type { Match } from './../types/worldcup';

export const MatchUtils = {
 
    getWinner(match: Match): string{
        if(this.isDraw(match)){
            return '';
        }
        let winner = match.home_team_name;
        if(match.away_team_score > match.home_team_score){
            winner = match.away_team_name;
        }
        return winner;
    },
    isDraw(match: Match): boolean{
        return match.draw == 1;
    }
}
