import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginPage from 'screens/login';
import HomePage from '../screens/home';
import EntoResearch from 'screens/entoresearch';

export type RootStackParamList = {
  Login: undefined;
  HomePage: undefined;
  EntoResearch: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen
          name="EntoResearch"
          component={EntoResearch}
          options={{
            title: 'Ento Research',
            headerTransparent: true,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
