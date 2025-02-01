import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import { fetchPublicKarmaActions } from '@/api';

export default function PublicFeedScreen() {
  const { data, isLoading, error } = useQuery('publicKarmaActions', fetchPublicKarmaActions);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if(error) {
    return (
      <View style={styles.container}>
        <Text>Error loading public feed.</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Public Karma Actions</Text>
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
  actionItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionType: { fontWeight: 'bold' },
}); 