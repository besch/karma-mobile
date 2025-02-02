import { useEffect, useState } from 'react'
import { router } from 'expo-router'
import { supabase } from '@/utils/supabase'

export default function App() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // checkInitialRoute()
  }, [])

  useEffect(() => {
    if (isMounted) {
      router.replace('/(tabs)')
    }
  }, [isMounted])

  return null
}