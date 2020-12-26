import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/root_stack_type';
import { ScreenName } from '../utils/screen_name_util';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.login
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
  const onLogin = (): void => navigation.navigate('Home');

  return (
    <View>
      <Pressable onPress={onLogin}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;
