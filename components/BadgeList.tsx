import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Badge {
  id: string;
  name: string;
  description: string;
}

interface BadgeListProps {
  badges: Badge[];
}

export function BadgeList({ badges }: BadgeListProps) {
  if (!badges.length) {
    return <Text>No badges earned yet.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Achievements</Text>
      {badges.map(badge => (
        <View key={badge.id} style={styles.badge}>
          <Text style={styles.badgeTitle}>{badge.name}</Text>
          <Text style={styles.badgeDescription}>{badge.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  badge: { backgroundColor: '#f0f0f0', padding: 8, borderRadius: 8, marginBottom: 6 },
  badgeTitle: { fontSize: 16, fontWeight: '600' },
  badgeDescription: { fontSize: 14 },
});

export default BadgeList; 