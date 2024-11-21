import 'react-native-gesture-handler';
import { COLORS } from './constants/colors';
import RootStack from './navigation';
import Providers from 'contexts/providers';
import { StatusBar } from 'expo-status-bar';
import { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';

const LoadingPage = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.BACKGROUND,
    }}>
    <ActivityIndicator size="large" color={COLORS.DEFAULT} />
  </View>
);

export default function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Providers>
        <RootStack />
        <StatusBar style="dark" />
      </Providers>
    </Suspense>
  );
}
