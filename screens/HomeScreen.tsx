import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import CalendarStrip from "react-native-calendar-strip";
import moment from 'moment';
import InteractiveGauge from '@/components/InteractiveGauge';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useUserStore } from '../state/userStore';
import { usePushNotifications } from '../hooks/usePushNotifications';
import { useRealtimeNotifications } from '../hooks/useRealtimeNotifications';
import { Colors, Typography } from '../theme';

// Adjusted navigation types for HomeStack
import { HomeStackParamList } from '../App';

export default function HomeScreen() {
  // Here, navigation is of type NavigationProp<HomeStackParamList>
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();
  const { user } = useUserStore();
  const [selectedDate, setSelectedDate] = React.useState(moment());
  const [karma, setKarma] = React.useState(70); // stub: fetch actual karma from store or API
  const minDate = moment().subtract(7, 'days');
  const maxDate = moment().add(7, 'days');

  // Always register for push notifications.
  usePushNotifications();
  // Subscribe to realtime notifications even if user is not yet set; hook checks for userId.
  useRealtimeNotifications(user?.id || '');

  const handleDateSelected = (date: moment.Moment) => {
    setSelectedDate(date);
    // TODO: refetch karma for that date if needed
  };

  // Dummy values; replace with real data from your user's profile/analytics.
  const currentKarma = 150;
  const nextLevel = 300;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to KarmaMeter!</Text>
      <InteractiveGauge value={currentKarma} maxValue={nextLevel} />
      <Text style={styles.subtitle}>Your Karma: {currentKarma}</Text>
      <View style={styles.buttonContainer}>
        {/* "Profile" is a bottom-tab. Hence, navigate using getParent() */}
        <Button title="View Profile" onPress={() => navigation.getParent()?.navigate('Profile')} />
        <Button title="View Analytics" onPress={() => navigation.navigate('Analytics')} />
        <Button title="Public Feed" onPress={() => navigation.navigate('PublicFeed')} />
        <Button title="Groups" onPress={() => navigation.navigate('Groups')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    alignItems: 'center', 
    padding: 20, 
    justifyContent: 'center', 
    backgroundColor: Colors.background 
  },
  title: { 
    ...Typography.header, 
    marginBottom: 20 
  },
  subtitle: { 
    ...Typography.title, 
    marginVertical: 10 
  },
  buttonContainer: { 
    width: '100%', 
    marginTop: 20, 
    justifyContent: 'space-around', 
    height: 200,
    // Added subtle shadow for better UI feedback
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
}); 