export type Player = {
  id: number;
  name: string;
  team: string;
  position: string;
};

export type PlayersData = {
  nba: Player[];
  nfl: Player[];
};
