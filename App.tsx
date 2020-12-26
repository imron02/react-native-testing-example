import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import { RootStackParamList } from './src/types/root_stack_type';
import { ScreenName } from './src/utils/screen_name_util';
import LoginScreen from './src/screens/login_screen';
import HomeScreen from './src/screens/home_screen';

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={ScreenName.login} component={LoginScreen} />
        <Stack.Screen name={ScreenName.home} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
