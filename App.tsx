import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import {PermissionsProvider} from './src/context/permissionsContext';

const App = () => {
  return (
    <PermissionsProvider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </PermissionsProvider>
  );
};

export default App;
