import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

export default function HelpScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Help & FAQ</Text>
      <Text style={styles.question}>Q: How do I earn karma points?</Text>
      <Text style={styles.answer}>
        A: Perform positive actions such as volunteering, donating, or recycling, then log them in the app.
      </Text>
      <Text style={styles.question}>Q: How do I upload proof?</Text>
      <Text style={styles.answer}>
        A: Use the submission screen to upload a photo or video of your action.
      </Text>
      <Text style={styles.question}>Q: How do I view my progress?</Text>
      <Text style={styles.answer}>
        A: Your profile screen shows your total karma points along with an interactive impact chart.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  question: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  answer: { fontSize: 16, marginBottom: 10 },
}); 