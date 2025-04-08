import {Order} from '../models/Cart';
import {cartStore} from '../stores/CartStore';
import {apiClient} from './apiClient';

export const submitOrder = async (payload: Order) => {
  try {
    await apiClient.sendOrder(payload);
    cartStore.clear();
  } catch (error) {
    throw error;
  }
};
