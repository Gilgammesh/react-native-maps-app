import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

const Map = () => {
  const [showPolyline, setShowPolyline] = useState<boolean>(true);

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    userLocation,
    followUserLocation,
    clearFollowUserLocation,
    routeLines,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      clearFollowUserLocation();
    };
  }, [followUserLocation, clearFollowUserLocation]);

  useEffect(() => {
    if (!following.current) {
      return;
    }
    const {latitude, longitude} = userLocation;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();
    following.current = true;
    mapViewRef.current?.animateCamera({
      center: {latitude, longitude},
    });
  };

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={ele => (mapViewRef.current = ele!)}
        style={styles.container}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => (following.current = false)}>
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="#252525"
            strokeWidth={3}
          />
        )}
        <Marker
          // image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: initialPosition.latitude,
            longitude: initialPosition.longitude,
          }}
          title={'Titulo'}
          description={'Descripción del marcador'}
        />
      </MapView>
      <Fab
        iconName="navigate-outline"
        onPress={centerPosition}
        style={styles.fab1}
      />
      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolyline(prev => !prev)}
        style={styles.fab2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab1: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  fab2: {
    position: 'absolute',
    bottom: 80,
    right: 20,
  },
});

export default Map;
