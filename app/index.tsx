import { useEffect } from 'react'
import { router } from 'expo-router'
import { supabase } from '@/utils/supabase'

export default function App() {
  useEffect(() => {
    checkInitialRoute()
  }, [])

  const checkInitialRoute = async () => {
    try {
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
