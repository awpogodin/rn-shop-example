import {makeAutoObservable} from 'mobx';
import {Product} from '../models/Product';
import {generateProducts} from '../utils/generateProducts';

class ProductStore {
  products: Product[] = generateProducts();

  constructor() {
    makeAutoObservable(this);
  }

  getById(id: string) {
    return this.products.find(p => p.id === id);
  }
}

export const productStore = new ProductStore();
