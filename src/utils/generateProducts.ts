import {Product} from '../models/Product';

export const generateProducts = (): Product[] => {
  return Array.from({length: 1000}, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Товар ${i + 1}`,
    price: Math.floor(50 + Math.random() * 950), // от 50 до 1000
    quantityAvailable: Math.floor(1 + Math.random() * 10),
  }));
};
