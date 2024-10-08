import React from 'react';
import {StatusBar, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Stack from './src/routes/Stack';
import Themeprovider from './src/utils/Themeprovider';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar backgroundColor="#FFF" />
      <NavigationContainer>
        <Stack />
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
