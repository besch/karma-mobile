import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useQuery } from 'react-query';
import { fetchChallenges } from '@/api';

export default function ChallengesScreen() {
  const { data, isLoading, error } = useQuery('challenges', () => fetchChallenges(true));

  if (isLoading) return (<View style={styles.loader}><ActivityIndicator /></View>);
  if (error) return (<View style={styles.loader}><Text>Error loading challenges.</Text></View>);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daily / Weekly Challenges</Text>
      <FlatList
        data={data?.challenges || []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.challengeItem}>
            <Text style={styles.challengeTitle}>{item.title}</Text>
            <Text style={styles.challengeReward}>Reward: {item.reward} points</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  challengeItem: { padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 10 },
  challengeTitle: { fontSize: 18 },
  challengeReward: { fontSize: 16, color: '#4caf50' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
}); 