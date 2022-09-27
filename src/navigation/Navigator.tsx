import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';
import {PermissionsContext} from '../context/permissionsContext';
import LoadingScreen from '../screens/LoadingScreen';

export type RootStackNavigatorParams = {
  MapScreen: undefined;
  PermissionsScreen: undefined;
};

const Stack = createStackNavigator<RootStackNavigatorParams>();

const Navigator = () => {
  const {permissions} = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={
        permissions.locationStatus === 'granted'
          ? 'MapScreen'
          : 'PermissionsScreen'
      }
      screenOptions={{
        headerShown: false,
      }}>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="MapScreen" component={MapScreen} />
      ) : (
        <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      )}
    </Stack.Navigator>
  );
};

export default Navigator;
