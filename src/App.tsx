import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStack} from './navigation/Root';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
