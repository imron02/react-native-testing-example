import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { RootStackParamList } from '../types/root_stack_type';
import { ScreenName } from '../utils/screen_name_util';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ScreenName.login
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface Values {
  email: string;
  password: string;
}

const LoginScreen = ({ navigation }: Props) => {
  const onLogin = (values: Values): void => {
    if (values.email && values.password) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={onLogin}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('Required')
            .min(5, 'Minimum length is 5')
        })}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          dirty
        }) => (
          <View style={styles.wrapper}>
            <TextInput
              placeholder="Input email"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Input password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            <TouchableOpacity
              onPress={handleSubmit}
              testID="btn-login"
              style={[
                styles.button,
                (!isValid || !dirty) && styles.btnDisabled
              ]}
              disabled={!isValid || !dirty}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
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
  },
  btnDisabled: {
    backgroundColor: '#ccc'
  }
});

export default LoginScreen;
