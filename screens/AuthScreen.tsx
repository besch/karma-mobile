import React from 'react';
import { Platform, Alert, View } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { supabase } from '../utils/supabase';

interface AuthScreenProps {
  onAuthSuccess?: (user: { id: string; email: string; name?: string }) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
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
            email: signInData.user.email,
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

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={26}
      style={{ width: 280, height: 80 }}
      onPress={handleAppleSignIn}
    />
  );
} 