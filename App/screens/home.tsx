import { RouteProp, useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { RootStackParamList } from '../navigation';

type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'HomePage'>;

export default function HomePage() {
  const router = useRoute<DetailsSreenRouteProp>();

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
