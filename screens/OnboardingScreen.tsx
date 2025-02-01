import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Onboarding: undefined;
  Profile: undefined;
  // add other screens as needed
};

export default function OnboardingScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to KarmaMeter!</Text>
      <Text style={styles.body}>
        Earn karma points by performing positive actions like volunteering, donating, and recycling.
      </Text>
      <Button title="Get Started" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  body: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
}); 