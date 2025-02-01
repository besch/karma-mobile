import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchGroups, joinGroup } from '@/api';
import { useUserStore } from '../state/userStore';

export default function GroupsScreen() {
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery('groups', fetchGroups);
  
  const mutation = useMutation(({ groupId, userId }: { groupId: string; userId: string }) => joinGroup(groupId, userId), {
    onSuccess: () => queryClient.invalidateQueries('groups'),
  });
  
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please log in to view groups.</Text>
      </View>
    );
  }
  
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
        <Text>Error loading groups.</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Available Groups</Text>
      <FlatList
        data={data?.groups || []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.groupItem}>
            <Text style={styles.groupName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Button title="Join Group" onPress={() => mutation.mutate({ groupId: item.id, userId: user.id })} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  groupItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  groupName: { fontWeight: 'bold', fontSize: 18 },
}); 