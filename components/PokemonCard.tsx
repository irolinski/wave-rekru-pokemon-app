import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { ColorValue, Image, Text, TouchableOpacity, View } from 'react-native';
import { pokeBall } from '~/assets';
import { typeColors } from '~/constants/styles/colors';
import { PokemonCardData, PokemonTypeProperty } from '~/types';
import TypePill from './TypePill';

// Import your local asset

const PokemonCard = ({ data }: { data: PokemonCardData }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Determine background colors
  const bgColors: ColorValue[] | ColorValue =
    data.types.length === 1
      ? [typeColors[data.types[0]], typeColors[data.types[0]]] // solid color
      : data.types.map((type) => typeColors[type]); // gradient

  return (
    <TouchableOpacity
      className="relative my-2 h-44 w-44 flex-col items-center justify-center overflow-hidden rounded-2xl"
      onPress={() => router.push('/modal')}>
      <LinearGradient
        colors={bgColors}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        style={{ width: '100%', height: '100%' }}
        className="absolute">
        <View className="w-full flex-row justify-center">
          <Image
            source={imageLoaded ? { uri: data.sprite } : pokeBall}
            className="h-20 w-20"
            onLoadEnd={() => setImageLoaded(true)}
          />
        </View>

        <View className="mt-2 flex-col items-center">
          <Text className="text-lg font-bold capitalize text-white">{data.name}</Text>
          <View className="mt-1 flex-row items-center justify-center">
            {data.types.map((type: PokemonTypeProperty, indexNum: number) => (
              <TypePill type={type} key={indexNum} context={'card'} />
            ))}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PokemonCard;
