import { Alert } from 'react-native';
import { PokemonObjTypeProperty, PokemonSearchObjNoDetails } from '~/types';

export const fetchPokemons = async (offset = 0, limit = 10) => {
  try {
    // Fetch basic Pokémon list
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();

    // Fetch details for each Pokémon card
    const detailedData = await Promise.all(
      data.results.map(async (pokemon: PokemonSearchObjNoDetails) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          id: details.id,
          name: details.name,
          sprite: details.sprites.front_default,
          types: details.types.map((t: PokemonObjTypeProperty) => t.type.name),
        };
      })
    );
    return detailedData;
  } catch (error) {
    console.error('Error fetching:', error);
    Alert.alert('Sorry, could not fetch Pokemon. Try again later.');
    return [];
  }
};
