import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import { fetchUserAnalytics } from '@/api';
import { useUserStore } from '../state/userStore';
// If you want to add charts, you can import a chart component here like ImpactChart

export default function AnalyticsScreen() {
  const { user } = useUserStore();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please log in to view your analytics.</Text>
      </View>
    );
  }

  const { data, isLoading, error } = useQuery(
    ['userAnalytics', user.id],
    () => fetchUserAnalytics(user.id),
    { enabled: !!user?.id }
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading analytics.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Analytics</Text>
      <Text style={styles.subHeader}>Total Actions: {data?.actions?.length || 0}</Text>
      {/* Optionally add a chart here to visualize aggregated impact */}
      <FlatList
        data={data?.actions || []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.actionItem}>
            <Text style={styles.actionType}>{item.action_type}</Text>
            <Text>{item.description}</Text>
            <Text>Points: {item.points}</Text>
            <Text>{new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  subHeader: { fontSize: 18, marginBottom: 12 },
  actionItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionType: { fontWeight: 'bold' },
}); 