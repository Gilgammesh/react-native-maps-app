import React from 'react';
import {StyleSheet, View} from 'react-native';
import Map from '../components/Map';

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;
