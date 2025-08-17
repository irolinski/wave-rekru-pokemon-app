import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
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
        <FlatList
          data={pokemonCardsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}>
              <Image source={{ uri: item.sprite }} style={{ width: 50, height: 50 }} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                <Text>{item.types.join(', ')}</Text>
              </View>
            </View>
          )}
          onEndReached={loadMore} // fetch next 10 when scrolling
          onEndReachedThreshold={0.5} // trigger when 50% from bottom
          ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}
        />
        {/* <Link href="/modal">Open modal</Link> */}
      </View>
    </>
  );
}
