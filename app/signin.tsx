import { Platform, Alert, View } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import { supabase } from '@/utils/supabase'

interface AuthProps {
  onAuthSuccess?: (user: {
    id: string;
    email: string;
    name?: string;
  }) => void;
}

// Changed to a default export so that Expo Router can find this screen.
export default function Signin({ onAuthSuccess }: AuthProps) {
  if (Platform.OS === 'ios')
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={26}
          style={{ width: 280, height: 80 }}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              })

              if (credential.identityToken) {
                const { error: signInError, data: signInData } = await supabase.auth.signInWithIdToken({
                  provider: 'apple',
                  token: credential.identityToken,
                })

                if (signInError) {
                  Alert.alert('Error', signInError.message)
                  console.error('Supabase auth error:', signInError)
                  return
                }

                // Verify session is established
                const { data: { session }, error: sessionError } = await supabase.auth.getSession()
                
                if (sessionError || !session) {
                  Alert.alert('Error', 'Failed to establish session')
                  console.error('Session error:', sessionError)
                  return
                }

                if (signInData.user) {
                  const user = {
                    id: signInData.user.id,
                    email: signInData.user.email!,
                    name: credential.fullName 
                      ? `${credential.fullName.givenName} ${credential.fullName.familyName}`
                      : undefined,
                  }
                  onAuthSuccess?.(user)
                }
              }
            } catch (e: unknown) {
              if (e && typeof e === 'object' && 'code' in e && e.code === 'ERR_REQUEST_CANCELED') {
                console.log('Sign in canceled')
              } else {
                Alert.alert('Error', 'An error occurred during sign in')
                console.error('Sign in error:', e)
              }
            }
          }}
        />
      </View>
    )
  return <>{/* Implement Android Auth options */}</>
} 