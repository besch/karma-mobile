import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useQuery } from 'react-query';
// Import the user store to identify the logged in user.
import { useUserStore } from '../state/userStore';
import { getUserImpact, fetchUserBadges } from '@/api';
import ImpactChart from '@/components/ImpactChart';
import { BadgeList } from '@/components/BadgeList';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Analytics: undefined;
  // ... other routes if needed
};

export default function ProfileScreen() {
  const { user } = useUserStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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

  const { data: badgeData, isLoading: badgesLoading, error: badgesError } = useQuery(
    ['userBadges', user.id],
    () => fetchUserBadges(user.id),
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
          <ImpactChart impactData={data?.weeklyImpact} />
          {badgesLoading ? (
            <Text>Loading badges...</Text>
          ) : badgesError ? (
            <Text>Error loading badges.</Text>
          ) : (
            <BadgeList badges={badgeData?.badges || []} />
          )}
          <Button title="View Analytics" onPress={() => navigation.navigate('Analytics')} />
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