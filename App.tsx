import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Snackbar from 'react-native-snackbar';

const App = () => {
  const [counter, setCounter] = useState(0);

  const onIncrement = () => {
    setCounter(counter + 1);
  };

  const onDecrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      Snackbar.show({
        text: 'Muncul error',
        duration: Snackbar.LENGTH_SHORT
      });
    }
  };

  return (
    <View style={styles.container} testID="component-app">
      <Text testID="counter-display" style={styles.heading}>
        The count is {counter}
      </Text>
      <Pressable style={styles.button} onPress={onIncrement}>
        <Text style={styles.buttonText}>Increment counter</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={onDecrement}>
        <Text style={styles.buttonText}>Decrement counter</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontSize: 40
  },
  button: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  errorText: {
    fontSize: 14,
    color: 'red'
  }
});

export default App;
