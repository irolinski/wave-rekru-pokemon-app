import { ColorValue, Text, TouchableOpacity } from 'react-native';
import { PokemonTypeProperty } from '~/types';

const TypePill = ({
  type,
  color,
  selected,
  onPress,
  context,
}: {
  type: PokemonTypeProperty;
  color?: ColorValue;
  selected?: boolean;
  onPress?: () => void;
  context: 'card' | 'menu';
}) => {
  return (
    <TouchableOpacity
      className={` ${context === 'card' ? 'mx-1 h-9 px-3 py-2' : 'mx-2.5 h-12 px-4 py-3'} items-center justify-center rounded-full  ${selected ? 'border' : ''}`}
      style={{ backgroundColor: color ?? '#CED3DF' }}
      onPress={onPress}>
      <Text className={` ${context === 'menu' ? 'text-lg font-bold' : 'text-xs'}`}>{type}</Text>
    </TouchableOpacity>
  );
};

export default TypePill;
