import { useEffect, useState } from 'react';
import {
    ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View
} from 'react-native';
import PokemonCard from '~/components/PokemonCard';
import TypePill from '~/components/TypePill';
import { typeColors } from '~/constants/styles/colors';
import { PokemonCardData, PokemonTypeProperty } from '~/types';
import { fetchPokemons } from '~/utils/pokeApi';

const NUM_OF_POKEMON_IN_SINGLE_FETCH_REQUEST_LIMIT = 10;

const allTypes: PokemonTypeProperty[] = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

export default function Home() {
  const [pokemonCardsData, setPokemonCardsData] = useState<PokemonCardData[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<PokemonTypeProperty[]>([]);

  // Fetch next batch
  const loadMore = async () => {
    if (isLoading) return;
    setIsLoading(true);
    const newData = await fetchPokemons(offset, NUM_OF_POKEMON_IN_SINGLE_FETCH_REQUEST_LIMIT);
    setPokemonCardsData([...pokemonCardsData, ...newData]);
    setOffset(offset + NUM_OF_POKEMON_IN_SINGLE_FETCH_REQUEST_LIMIT);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  // Filter Pokémon by selected types
  const filteredPokemons =
    selectedTypes.length === 0
      ? pokemonCardsData
      : pokemonCardsData.filter((pokemon) =>
          selectedTypes.every((type) => pokemon.types.includes(type))
        );

  return (
    <SafeAreaView className="flex-1 flex-col pt-20" style={{ backgroundColor: '#F1F4F9' }}>
      {/* Header */}
      <View className="w-full flex-row items-center justify-center py-8">
        <Text className="text-xl font-bold">Welcome to the PokeAPI App!</Text>
      </View>
      {/* Horizontal Type Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mx-8 mb-4"
        style={{ height: 60 }}
        contentContainerStyle={{ paddingHorizontal: 8 }}>
        {allTypes.map((type, indexNum: number) => {
          const isSelected = selectedTypes.includes(type);
          return (
            <TypePill
              key={indexNum}
              type={type}
              selected={isSelected}
              color={type ? typeColors[type] : '#FFFFFF'}
              context={'menu'}
              onPress={() => {
                if (isSelected) {
                  // deselect
                  setSelectedTypes(selectedTypes.filter((t) => t !== type));
                } else if (selectedTypes.length < 2) {
                  // select max 2
                  setSelectedTypes([...selectedTypes, type]);
                } else {
                  // replace the oldest selection
                  setSelectedTypes([selectedTypes[1], type]);
                }
              }}
            />
          );
        })}
      </ScrollView>

      {/* Pokémon List */}
      <FlatList
        data={filteredPokemons}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        renderItem={({ item }) => <PokemonCard data={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
      />
    </SafeAreaView>
  );
}
