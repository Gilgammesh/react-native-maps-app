import React, {useContext} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import CustomButton from '../components/CustomButton';
import {PermissionsContext} from '../context/permissionsContext';

const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionsContext);

  return (
    <SafeAreaView style={styles.container}>
      <Text>PermissionsScreen</Text>
      <CustomButton title="Permiso" onPress={askLocationPermission} />
      <Text>{JSON.stringify(permissions, null, 2)}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PermissionsScreen;
