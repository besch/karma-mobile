import { useEffect } from 'react';
import { supabase } from '@/utils/supabase';
import * as Notifications from 'expo-notifications';

export function useRealtimeNotifications(userId: string) {
  useEffect(() => {
    if (!userId) return;

    const channel = supabase.channel('realtime_notifications');
    channel.on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        console.log('Realtime notification received:', payload.new);
        Notifications.scheduleNotificationAsync({
          content: {
            title: 'New Notification',
            body: payload.new.message,
          },
          trigger: null, // immediately send the notification
        });
      }
    ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);
} 