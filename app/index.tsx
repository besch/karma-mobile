import { useEffect } from 'react'
import { router } from 'expo-router'
import { supabase } from '@/utils/supabase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUserStore } from '@/state/userStore'

export default function App() {
  useEffect(() => {
    checkInitialRoute()
  }, [])

  const checkInitialRoute = async () => {
    try {
      // Check if user data exists in AsyncStorage
      const storedUser = await AsyncStorage.getItem('user')
      if (storedUser) {
        const user = JSON.parse(storedUser)
        useUserStore.getState().setUser(user)
        router.replace('/(tabs)')
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      
      if (session) {
        router.replace('/(tabs)')
      } else {
        router.replace('/signin')
      }
    } catch (error) {
      console.error('Error checking initial route:', error)
      router.replace('/signin')
    }
  }

  // Return empty view while checking
  return null
}
