export interface ICartItem {
  productId: number;
  quantity: number;
  name: string;
  price: number;
}

export interface ICart {
  items: ICartItem[];
  isCouponApplied: boolean;
  discountCode: string;
  discount: number;
}

export interface IOrder {
  userId: string;
  items: ICartItem[];
  total: number;
  discountApplied: number;
}

export interface IDiscountCode {
  code: string;
  used: boolean;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
}
