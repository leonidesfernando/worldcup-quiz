import { th } from 'framer-motion/client';
import type { Match } from './../types/worldcup';

export const MatchUtils = {
 
    getWinnerCountryCode(match: Match): string{

        if(match.home_team_score > match.away_team_score){
            return match.home_team_code;
        }
        if(match.away_team_score > match.home_team_score){
            return match.away_team_code;
        }

        if(match.home_team_score_penalties > match.away_team_score_penalties){
            return match.home_team_code;
        }
        if(match.away_team_score_penalties > match.home_team_score_penalties){
            return match.away_team_code;
        }
        throw new Error("Match has no winner");
    },
    isDraw(match: Match): boolean{
        return match.draw == 1 || match.extra_time == 1;
    }
}
