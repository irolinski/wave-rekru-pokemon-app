import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <>
      <View className="flex-1 items-center justify-center p-6">
        <Text>Hello world!</Text>
        {/* <Link href="/modal">Open modal</Link> */}
      </View>
    </>
  );
}
