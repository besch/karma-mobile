import React from 'react';
import { View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { useQuery } from 'react-query';
import { fetchNearbyKarmaActions } from '@/api';
import { IconSymbol } from '@/components/ui/IconSymbol';

export function MapScreen() {
  const [region, setRegion] = React.useState<Region | null>(null);
  const [filter, setFilter] = React.useState<string>('all');

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
    { enabled: !!region }
  );

  if (!region || isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const filteredData =
    filter === 'all' ? data : data.filter((action: any) => action.action_type === filter);

  return (
    <>
      <View style={styles.filterContainer}>
        <Button title="All" onPress={() => setFilter('all')} />
        <Button title="Volunteering" onPress={() => setFilter('volunteering')} />
      </View>
      <MapView style={styles.map} region={region}>
        {filteredData &&
          filteredData.map((action: any) => (
            <Marker
              key={action.id}
              coordinate={{ latitude: action.latitude, longitude: action.longitude }}
            >
              <View style={styles.customMarker}>
                <IconSymbol name="map.fill" size={24} color="blue" />
              </View>
            </Marker>
          ))}
      </MapView>
    </>
  );
}

export default MapScreen;
const styles = StyleSheet.create({
  map: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  customMarker: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 