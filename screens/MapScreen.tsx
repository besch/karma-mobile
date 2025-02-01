import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { useQuery } from 'react-query';
import { fetchNearbyKarmaActions } from '@/api';

export function MapScreen() {
  const [region, setRegion] = React.useState<Region | null>(null);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    })();
  }, []);

  const { data, isLoading, error } = useQuery(
    ['nearbyActions', region],
    () => {
      if (!region) return Promise.resolve([]);
      return fetchNearbyKarmaActions(region.latitude, region.longitude);
    },
    {
      enabled: !!region,
    }
  );

  if (!region || isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <MapView style={styles.map} region={region}>
      {data && data.map((action: any) => (
        <Marker
          key={action.id}
          coordinate={{ latitude: action.latitude, longitude: action.longitude }}
          title={action.action_type}
          description={action.description}
        />
      ))}
    </MapView>
  );
}

export default MapScreen;
const styles = StyleSheet.create({
  map: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
}); 