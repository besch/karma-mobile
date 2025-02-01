import React from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export function InteractiveGauge({ value, maxValue }: { value: number; maxValue: number; }) {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, maxValue],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [value]);

  return (
    <View style={styles.container}>
      <Svg height="120" width="120">
        <Circle
          stroke="#ccc"
          fill="none"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
        />
        <AnimatedCircle
          stroke="#4caf50"
          fill="none"
          cx="60"
          cy="60"
          r={radius}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <Text style={styles.text}>{value}/{maxValue}</Text>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  text: { marginTop: 10, fontSize: 20, fontWeight: 'bold' },
});

export default InteractiveGauge; 