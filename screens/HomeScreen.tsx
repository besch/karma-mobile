import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import CalendarStrip from "react-native-calendar-strip";
import moment from 'moment';
import InteractiveGauge from '@/components/InteractiveGauge';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Profile: undefined;
  Analytics: undefined;
  PublicFeed: undefined;
  Groups: undefined;
};

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selectedDate, setSelectedDate] = React.useState(moment());
  const [karma, setKarma] = React.useState(70); // stub: fetch actual karma from the store or API
  const minDate = moment().subtract(7, 'days');
  const maxDate = moment().add(7, 'days');

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
        <Button title="View Profile" onPress={() => navigation.navigate('Profile')} />
        <Button title="View Analytics" onPress={() => navigation.navigate('Analytics')} />
        <Button title="Public Feed" onPress={() => navigation.navigate('PublicFeed')} />
        <Button title="Groups" onPress={() => navigation.navigate('Groups')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 20, marginVertical: 10 },
  buttonContainer: { width: '100%', marginTop: 20, justifyContent: 'space-around', height: 200 }
}); 