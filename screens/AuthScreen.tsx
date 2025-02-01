import React, { useState } from 'react';
import { Platform, Alert, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '../utils/supabase';
import LottieView from 'lottie-react-native';

interface AuthScreenProps {
  onAuthSuccess?: (user: { id: string; email: string; name?: string }) => void;
  navigation: any;
}

export default function AuthScreen({ onAuthSuccess, navigation }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (Platform.OS !== 'ios') {
    return (
      <View>
        {/* Implement Android Auth options */}
      </View>
    );
  }

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential.identityToken) {
        const { error: signInError, data: signInData } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });

        if (signInError) {
          Alert.alert('Error', signInError.message);
          return;
        }
        if (signInData.user) {
          const user = {
            id: signInData.user.id,
            email: signInData.user.email!,
            name: credential.fullName
              ? `${credential.fullName.givenName} ${credential.fullName.familyName}`
              : undefined,
          };
          onAuthSuccess && onAuthSuccess(user);
        }
      }
    } catch (e) {
      Alert.alert('Error', 'An error occurred during sign in');
    }
  };

  const handleLogin = () => {
    // Implement your login logic (e.g., with Supabase authentication)
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animation.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>Welcome to KarmaMeter</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text style={styles.forgot}>Forgot Password?</Text>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={26}
        style={{ width: 280, height: 80 }}
        onPress={handleAppleSignIn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  lottie: { width: 200, height: 200 },
  title: { fontSize: 24, fontWeight: 'bold', marginVertical: 20 },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10
  },
  forgot: { marginTop: 10, color: 'blue' }
}); 