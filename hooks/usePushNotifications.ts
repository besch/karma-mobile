import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from '@/utils/registerForPushNotificationsAsync';

export function usePushNotifications() {
  useEffect(() => {
    registerForPushNotificationsAsync();

    const notificationListener = Notifications.addNotificationReceivedListener(notification =>
      console.log('Notification received:', notification)
    );
    const responseListener = Notifications.addNotificationResponseReceivedListener(response =>
      console.log('Notification response received:', response)
    );
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
} 