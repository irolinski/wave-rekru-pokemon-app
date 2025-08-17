import { ColorValue, Text, View } from 'react-native';
import { PokemonTypeProperty } from '~/types';

const TypePill = ({ type, color }: { type: PokemonTypeProperty; color?: ColorValue }) => {
  return (
    <View className="mx-1 rounded-full px-3 py-2" style={{ backgroundColor: color ?? '#CED3DF' }}>
      <Text className="text-xs font-medium">{type}</Text>
    </View>
  );
};

export default TypePill;
