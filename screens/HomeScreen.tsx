import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import moment, { Moment } from 'moment';
import { Svg, Circle, Text as SvgText } from 'react-native-svg';

export default function HomeScreen() {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const handleDateSelected = (date: Moment) => setSelectedDate(date);

  return (
    <View style={styles.container}>
      <View style={[styles.gaugeContainer, { width: Dimensions.get('window').width, height: 200 }]}>
        <Svg width="200" height="200">
          {/* Background Circle */}
          <Circle cx="100" cy="100" r="90" stroke="#e6e6e6" strokeWidth="15" fill="none" />
          {/* Foreground Circle representing karma meter; animation can be enhanced using react-native-reanimated */}
          <Circle 
            cx="100" 
            cy="100" 
            r="90" 
            stroke="green" 
            strokeWidth="15" 
            fill="none"
            strokeDasharray="565" // approximate circumference
            strokeDashoffset={565 - (565 * 0.7)} // 70% progress as an example
          />
          <SvgText
            x="100"
            y="110"
            textAnchor="middle"
            fill="#333"
            fontSize="24"
            fontWeight="bold">
            70%
          </SvgText>
        </Svg>
      </View>
      <CalendarStrip
        calendarAnimation={{ type: 'sequence', duration: 30 }}
        daySelectionAnimation={{
          type: 'border',
          duration: 200,
          borderWidth: 0,
          borderHighlightColor: 'transparent',
        }}
        style={styles.calendar}
        calendarHeaderStyle={{ display: 'none' }}
        dateNumberStyle={{ color: '#666666', fontSize: 16 }}
        dateNameStyle={{ color: '#666666', fontSize: 12 }}
        highlightDateNumberStyle={{
          color: 'white',
          backgroundColor: 'black',
          width: 24,
          height: 24,
          textAlign: 'center',
          lineHeight: 24,
          borderRadius: 12,
          overflow: 'hidden',
          fontSize: 16,
        }}
        highlightDateNameStyle={{ color: '#666666', fontSize: 12 }}
        styleWeekend={false}
        selectedDate={selectedDate}
        onDateSelected={handleDateSelected}
        useNativeDriver
        scrollable
      />
      <Text style={styles.info}>Your daily karma gauge is shown above.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  gaugeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    height: 100,
    paddingTop: 20,
    paddingBottom: 10,
  },
  info: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
}); 