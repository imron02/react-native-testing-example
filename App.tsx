import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import 'react-native-gesture-handler';

import { RootStackParamList } from './src/types/root_stack_type';
import { ScreenName } from './src/utils/screen_name_util';
import { RootState } from './src/redux/root_reducer';
import { APP_INIT } from './src/utils/constant_util';
import store from './src/redux/store';
import LoginScreen from './src/screens/login_screen';
import HomeScreen from './src/screens/home_screen';
import SplashScreen from './src/screens/splash_screen';

export type AppDispatch = typeof store.dispatch;

const Stack = createStackNavigator<RootStackParamList>();

export const RootNav = () => {
  const dispatch = useDispatch();
  const { isLoading, userToken } = useSelector(
    (state: RootState) => state.login
  );

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: APP_INIT });
    }, 3000);
  }, []);

  return (
    <Stack.Navigator>
      {isLoading ? (
        <Stack.Screen
          name={ScreenName.splash}
          component={SplashScreen}
          options={{
            title: '',
            headerStyle: { backgroundColor: 'red', elevation: 0 }
          }}
        />
      ) : userToken ? (
        <Stack.Screen name={ScreenName.home} component={HomeScreen} />
      ) : (
        <Stack.Screen name={ScreenName.login} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
