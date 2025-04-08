export interface CartItem {
  productId: string;
  quantity: number;
}

export type DeliveryOption = 'leaveAtDoor' | 'noContact';

export interface Order {
  items: CartItem[];
  options: DeliveryOption[];
}
