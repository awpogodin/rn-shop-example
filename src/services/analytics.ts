import {apiClient} from './apiClient';

export async function sendAnalyticsEvent(payload: any) {
  try {
    await apiClient.sendAnalytics(payload);
    console.log('Аналитика отправлена успешно');
  } catch (error) {
    console.error('Ошибка при отправке аналитики:', error);
  }
}
