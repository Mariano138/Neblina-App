import { useCallback, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
export default function useNotifications() {
  useEffect(() => {
    registerForNotifications();
  }, []);

  const registerForNotifications = async () => {
    if (Device.isDevice) {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('No se concedieron permisos para notificaciones');
      }
    }
  };

  const sendNotification = useCallback(async (reminderDate: Date, title: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '📌 Recordatorio',
        body: title,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: reminderDate,
      },
    });

    console.log('el reminder es:', reminderDate);
  }, []);

  return sendNotification;
}
