import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';
// Import the user store to identify the logged in user.
import { useUserStore } from '../state/userStore';
import { getUserImpact } from '@/api';

export default function ProfileScreen() {
  const { user } = useUserStore();

  // If not logged in, show a message.
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Please sign in to view your profile.</Text>
      </View>
    );
  }

  const { data, isLoading, error } = useQuery(
    ['userImpact', user.id],
    () => getUserImpact(user.id),
    { enabled: !!user }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile & Impact Report</Text>
      {isLoading ? (
        <Text>Loading your impact...</Text>
      ) : error ? (
        <Text>Error loading impact: {error instanceof Error ? error.message : 'Unknown error'}</Text>
      ) : (
        <>
          <Text>Your total karma points: {data?.totalKarma || 0}</Text>
          <Text>Achievements: Volunteer, Donor, Eco Champion</Text>
        </>
      )}
      {/* Additional metrics, leaderboards, impact charts, etc. can be added here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
}); 