export type PokemonSearchObjNoDetails = { name: string; url: string };
export type PokemonObjTypeProperty = { slot: number; type: { name: string; url: string } };

export type PokemonTypeProperty =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export type PokemonCardData = {
  id: number;
  name: string;
  sprite: string;
  types: PokemonTypeProperty[];
};
