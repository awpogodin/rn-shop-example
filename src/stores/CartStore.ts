import {makeAutoObservable, reaction} from 'mobx';
import {productStore} from './ProductStore';
import {DeliveryOption} from '../models/Cart';
import {sendAnalyticsEvent} from '../services/analytics';
import {debounce} from '../utils/debounce';

interface CartItem {
  productId: string;
  quantity: number;
}

const debouncedSendAnalyticsEvent = debounce(sendAnalyticsEvent, 2000);

class CartStore {
  cart: CartItem[] = [];
  options: DeliveryOption[] = [];

  availableOptions: DeliveryOption[] = ['leaveAtDoor', 'noContact'];

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => ({
        // клонируем
        cart: this.cart.map(item => ({...item})),
        options: [...this.options],
      }),
      data => {
        debouncedSendAnalyticsEvent({
          type: 'cart_updated',
          payload: data,
        });
      },
    );
  }

  addToCart(productId: string) {
    const product = productStore.getById(productId);
    if (!product) {
      return;
    }

    const item = this.cart.find(i => i.productId === productId);
    const currentQty = item?.quantity ?? 0;

    if (currentQty >= product.quantityAvailable) {
      // превысили остаток на складе
      console.warn(`Недостаточно товара ${product.name} на складе`);
      return;
    }

    if (item) {
      item.quantity++;
      return;
    }
    this.cart.push({productId, quantity: 1});
  }

  decreaseQuantity(productId: string) {
    const item = this.cart.find(i => i.productId === productId);
    if (!item) {
      return;
    }
    item.quantity--;
    if (item.quantity <= 0) {
      this.removeFromCart(productId);
    }
  }

  removeFromCart(productId: string) {
    this.cart = this.cart.filter(i => i.productId !== productId);
  }

  toggleOption(option: DeliveryOption) {
    if (this.options.includes(option)) {
      this.options = this.options.filter(o => o !== option);
      return;
    }
    this.options.push(option);
  }

  clear() {
    this.cart = [];
    this.options = [];
  }

  getByProductId(id: string) {
    return this.cart.find(c => c.productId === id);
  }

  get totalPrice() {
    return this.cart.reduce((sum, item) => {
      const product = productStore.getById(item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  }

  get totalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }
}

export const cartStore = new CartStore();
