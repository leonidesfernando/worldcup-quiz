// src/types/worldcup.ts

export interface Tournament {
  key_id: number;
  tournament_id: string;
  tournament_name: string;
  year: number;
  start_date: string;
  end_date: string;
  host_country: string;      // ← fixed
  winner: string;            // ← fixed
  host_won: number;
  count_teams: number;
  // add any other fields you use later (e.g. format, confederation, etc.)
}

export interface Match {
  key_id: number;
  match_id: string;
  tournament_id: string;
  tournament_name: string;
  match_date: string;
  match_name: string;
  match_time: string;
  stadium_name: string;
  stage_name: string;
  group_name?: string;
  city_name: string;
  country_name: string;
  home_team_id: string;
  home_team_code: string,
  home_team_name: string;
  away_team_id: string;
  away_team_code: string;
  away_team_name: string;
  home_team_score: number;
  away_team_score: number;
  score: string;
  home_team_score_penalties: number;
  away_team_score_penalties: number;
  draw: number;
  extra_time: number;
	penalty_shootout: number;
	score_penalties: string;
	home_team_win: number;
	away_team_win: number;
  result: string;
}

export interface Goal {
  given_name: string;
  family_name: string;
  key_id: number;
  goal_id: string;
  tournament_id: string;
  tournament_name: string;
  match_id: string;
  match_name: string;
  match_date: string;
  stage_name: string;
  group_name?: string;
  team_id: string;               // ← changed to optional (with ?)
  team_name?: string;          // ← add this (it's in the real data)
  team_code: string;
  home_team: number;
	away_team: number;
  minute_regulation: number;
  minute_label: string;
  own_goal: boolean | number;
  penalty: number;
  match_period: string;
  player_id: string;
  shirt_number: number;
  player_team_id: string;
  player_team_name: string;
  player_team_code:string;
  minute_stoppage?: number;
}

export interface AwardWinners {
  key_id: number;
  award_id: string;
  award_name: string;
  tournament_id: string;
  tournament_name: string;
  player_id: string;
  //player_name: string;
  team_id: string;
  team_name: string;
  shared: number;
  given_name: string;
  family_name: string;
}

export interface PlayerApparences {
	key_id: number;
	tournament_id: string;
	tournament_name: string;
	match_id: string;
	match_name: string;
	match_date: string;
	stage_name: string;
	group_name: string;
	team_id: string;
	team_name: string;
	team_code: string;
	home_team: number;
	away_team: number;
	player_id: string;
	family_name: string;
	given_name: string;
	shirt_number: number;
	position_name: string;
	position_code: string;
	starter: number;
	substitute: number;
}

export interface Hosts {
  key_id: number;
  tournament_id: string;
  tournament_name: string;
  team_id: string;
  team_name:string;
  team_code:string;
  performance:string;
}