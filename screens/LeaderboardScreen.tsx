import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Share } from 'react-native';
import { useQuery } from 'react-query';
import { fetchLeaderboard } from '@/api';

export default function LeaderboardScreen() {
  const { data, isLoading, error } = useQuery('leaderboard', fetchLeaderboard);

  const onShare = async (userName: string, totalKarma: number) => {
    try {
      await Share.share({
        message: `${userName} has ${totalKarma} karma points on KarmaMeter! Join me in making a difference.`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return (<View style={styles.loader}><ActivityIndicator /></View>);
  if (error) return (<View style={styles.loader}><Text>Error loading leaderboard.</Text></View>);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Leaderboard</Text>
      <FlatList
        data={data?.leaderboard || []}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <View style={styles.itemContent}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.points}>{item.totalKarma} pts</Text>
            </View>
            <Button title="Share" onPress={() => onShare(item.name, item.totalKarma)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  item: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  rank: { fontSize: 18, width: 30 },
  itemContent: { flex: 1 },
  name: { fontSize: 18 },
  points: { fontSize: 16, color: '#4caf50' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
}); 