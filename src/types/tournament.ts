export interface Tournament {
  key_id: number;
  tournament_id: string;
  tournament_name: string;
  year: number;
  start_date: string;
  end_date: string;
  ball_name: string;
  incorrect_ball_names: string[];
  host_country: string;
  winner: string;
  host_won: number;
  count_teams: number;
}
