import { store } from "../store/store";
import { ICart, ICartItem } from "../types";

export const addItemToCart = (
  userId: string,
  productId: number,
  quantity: number,
  price: number
): ICartItem[] => {
  if (!store.carts[userId]) {
    store.carts[userId] = {
      isCouponApplied: false,
      items: [],
      discount: 0,
      discountCode: "",
    };
  }
  const product = store.products.find((p) => p.id === productId);
  if (!product) {
    return [];
  }
  const newItem = { productId, quantity, price, name: product.name };
  const productAlreadyExist = store.carts[userId].items.find(
    (ci) => ci.productId === productId
  );
  if (!productAlreadyExist) {
    store.carts[userId].items.push(newItem);
  } else {
    for (let i = 0; i < store.carts[userId].items.length; i++) {
      const cartItem = store.carts[userId].items[i];
      if (cartItem.productId === productId) cartItem.quantity += quantity;
    }
  }
  return store.carts[userId].items;
};

export const getCart = (userId: string): ICart => {
  if (store.carts[userId]) return store.carts[userId];
  return {
    items: [],
    discount: 0,
    isCouponApplied: false,
    discountCode: "",
  };
};

export const removeItemFromCart = (
  userId: string,
  productId: number,
  quantity: number
): ICartItem[] => {
  if (!store.carts[userId]) {
    return [];
  }
  const cart = store.carts[userId];
  for (let i = 0; i < cart.items.length; i++) {
    if (cart.items[i].productId === productId) {
      if (cart.items[i].quantity > quantity) {
        cart.items[i].quantity -= quantity;
      } else {
        cart.items.splice(i, 1);
      }
      break;
    }
  }
  return cart.items;
};
