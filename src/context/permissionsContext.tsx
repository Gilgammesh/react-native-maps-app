import React, {createContext, useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  PERMISSIONS,
  PermissionStatus,
  check,
  request,
  openSettings,
} from 'react-native-permissions';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}
export const initialPermissions: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
};

export const PermissionsContext = createContext<PermissionsContextProps>(
  {} as PermissionsContextProps,
);

export const PermissionsProvider = ({children}: {children: JSX.Element}) => {
  const [permissions, setPermissions] =
    useState<PermissionsState>(initialPermissions);

  useEffect(() => {
    const checkLocationPermission = async () => {
      let permissionStatus: PermissionStatus;
      if (Platform.OS === 'ios') {
        permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      } else {
        permissionStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
      }

      setPermissions(prev => ({...prev, locationStatus: permissionStatus}));
    };
    checkLocationPermission();
  }, []);

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    }
    if (permissionStatus === 'blocked') {
      openSettings(); // Abriendo settings del dispositivo
    }
    setPermissions({...permissions, locationStatus: permissionStatus});
  };

  const value: PermissionsContextProps = {
    permissions,
    askLocationPermission,
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
};
