import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarStrip from "react-native-calendar-strip";
import moment from 'moment';
import { InteractiveGauge } from '@/components/InteractiveGauge';

export function HomeScreen() {
  const [selectedDate, setSelectedDate] = React.useState(moment());
  const [karma, setKarma] = React.useState(70); // stub: fetch actual karma from the store or API
  const minDate = moment().subtract(7, 'days');
  const maxDate = moment().add(7, 'days');

  const handleDateSelected = (date: moment.Moment) => {
    setSelectedDate(date);
    // TODO: refetch karma for that date if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>KarmaMeter Dashboard</Text>
      <CalendarStrip
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 0,
          borderHighlightColor: "transparent",
        }}
        style={styles.calendar}
        calendarHeaderStyle={{ display: "none" }}
        dateNumberStyle={{ color: "#666666", fontSize: 16 }}
        dateNameStyle={{ color: "#666666", fontSize: 12 }}
        highlightDateNumberStyle={{
          color: "white",
          backgroundColor: "black",
          width: 24,
          height: 24,
          textAlign: "center",
          lineHeight: 24,
          borderRadius: 12,
          overflow: "hidden",
          fontSize: 16,
        }}
        highlightDateNameStyle={{ color: "#666666", fontSize: 12 }}
        selectedDate={selectedDate}
        onDateSelected={handleDateSelected}
        minDate={minDate}
        maxDate={maxDate}
        scrollable={true}
      />
      {/* Interactive gauge for daily karma */}
      <InteractiveGauge value={karma} />
      {/* (Other sections such as recent actions can follow) */}
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  calendar: { height: 100, paddingVertical: 10 },
}); 