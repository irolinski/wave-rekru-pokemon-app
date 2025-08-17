import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import PokemonCard from '~/components/PokemonCard';
import { PokemonCardData } from '~/types';
import { fetchPokemons } from '~/utils/pokeApi';

const NUM_OF_POKEMON_IN_SINGLE_FETCH_REQUEST_LIMIT = 10;

export default function Home() {
  const [pokemonCardsData, setPokemonCardsData] = useState<PokemonCardData[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadMore = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const newData = await fetchPokemons(offset, NUM_OF_POKEMON_IN_SINGLE_FETCH_REQUEST_LIMIT);
    setPokemonCardsData([...pokemonCardsData, ...newData]);
    setOffset(offset + 10);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <>
      <View className="flex-1 items-center justify-center p-6">
        <View className="w-full">
          <FlatList
            data={pokemonCardsData}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-around' }}
            renderItem={({ item }) => <PokemonCard data={item} />}
            onEndReached={loadMore} // fetch next 10 when scrolling
            onEndReachedThreshold={0.5} // trigger when 50% from bottom
            ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
          />
        </View>
      </View>
    </>
  );
}
