import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeText = (type: string) => (value: string) => {
    if (type === 'email') {
      setEmail(value);
    }

    if (type === 'password') {
      setPassword(value);
    }
  };

  const onLogin = (): void => navigation.navigate('Home');

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TextInput
          placeholder="Input email"
          style={styles.textInput}
          onChangeText={onChangeText('email')}
          value={email}
        />
        <TextInput
          placeholder="Input password"
          style={styles.textInput}
          onChangeText={onChangeText('password')}
          value={password}
        />
        <Pressable onPress={onLogin} testID="btn-login" style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper: {
    marginTop: '50%',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  textInput: {
    width: '100%',
    height: 40,
    marginBottom: 16,
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  }
});

export default LoginScreen;
