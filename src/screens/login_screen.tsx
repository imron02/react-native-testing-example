import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Snackbar from 'react-native-snackbar';

import { signIn } from '../redux/login_action';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../App';
import { SIGN_OUT } from '../utils/constant_util';

interface IValues {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);

  const onLogin = async (values: IValues): Promise<void> => {
    try {
      setLoading(true);
      if (values.email && values.password) {
        const response = await signIn(values.email, values.password);
        dispatch(response);
      }
      setLoading(false);
    } catch (e) {
      dispatch({ type: SIGN_OUT });
      Snackbar.show({
        text: e.message,
        duration: Snackbar.LENGTH_SHORT
      });
      setLoading(false);
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
            {loading ? (
              <ActivityIndicator testID="loading-component" color="red" />
            ) : (
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
            )}
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
