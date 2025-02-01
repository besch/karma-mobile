import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface GaugeProps {
  value: number; // from 0 to 100
}

export const InteractiveGauge: React.FC<GaugeProps> = ({ value }) => {
  // Simple animated value for gauge fill (stub animation)
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 800,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.gauge, { width: animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      }) }]} />
      <Text style={styles.label}>{value}% Karma Today</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  gauge: {
    height: 20,
    backgroundColor: '#4caf50',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
}); 