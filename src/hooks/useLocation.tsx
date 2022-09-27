import {useEffect, useState, useRef} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {Location} from '../interfaces/appInterfaces';

const useLocation = () => {
  const [hasLocation, setHasLocation] = useState<boolean>(false);

  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const [routeLines, setRouteLines] = useState<Location[]>([]);

  const watchId = useRef<number>();

  const isMounted = useRef<boolean>(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  });

  useEffect(() => {
    getCurrentLocation().then(location => {
      if (!isMounted.current) {
        return;
      }
      setInitialPosition(location);
      setUserLocation(location);
      setRouteLines(prev => [...prev, location]);
      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({err}),
        {enableHighAccuracy: true},
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({coords}) => {
        if (!isMounted.current) {
          return;
        }
        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };
        setUserLocation(location);
        setRouteLines(prev => [...prev, location]);
      },
      err => console.log({err}),
      {
        enableHighAccuracy: true,
        distanceFilter: 10, // Cada 10 metros se monitorea la posición
      },
    );
  };

  const clearFollowUserLocation = () => {
    if (watchId.current) {
      Geolocation.clearWatch(watchId.current);
    }
  };

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    userLocation,
    followUserLocation,
    clearFollowUserLocation,
    routeLines,
  };
};

export default useLocation;
