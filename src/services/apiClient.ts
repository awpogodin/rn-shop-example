import {productStore} from '../stores/ProductStore';

const randomDelay = (min = 500, max = 1500) => {
  return new Promise(resolve =>
    setTimeout(resolve, Math.random() * (max - min) + min),
  );
};

const randomChance = (probability: number) => {
  return Math.random() < probability;
};

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const apiClient = {
  async sendAnalytics({type, payload}: {type: string; payload: unknown}) {
    await randomDelay();
    if (randomChance(0.2)) {
      throw new ApiError('Сервис недоступен');
    }
    console.log(`Событие '${type}' отправлено: ${payload}`);
  },

  async sendOrder(payload: {
    items: {productId: string; quantity: number}[];
    options: string[];
  }) {
    await randomDelay();

    // Ошибка 1: сервис недоступен
    if (randomChance(0.1)) {
      throw new ApiError('Сервис недоступен');
    }

    // Ошибка 2: минимальная сумма
    const total = payload.items.reduce((sum, item) => {
      const product = productStore.getById(item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    if (total < 1000) {
      throw new ApiError('Минимальная сумма заказа — 1000р');
    }

    // Ошибка 3: нехватка товара
    for (const item of payload.items) {
      const product = productStore.getById(item.productId);
      if (product && item.quantity > product.quantityAvailable) {
        throw new ApiError(
          `Недостаточное количество товара "${product.name}" на складе`,
        );
      }
    }

    console.log('Заказ успешно оформлен', payload);
  },
};
