import { store } from "../store/store";
import { IOrder } from "../types";

export const checkout = (
  userId: string
): { finalTotal?: number; message: string } => {
  const cart = store.carts[userId] || [];
  if (!cart.items.length) {
    return { finalTotal: 0, message: "Cart is empty" };
  }
  console.log("ussers' cart is this ", cart);

  const doesCouponStillExists = store.discountCodes.find(
    (dc) => dc === cart.discountCode
  );
  if (!doesCouponStillExists) {
    return {
      message: "Sorry, coupon was used by other user",
    };
  }
  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  let finalTotal = total;
  finalTotal -= cart.discount;
  store.orderCount++;
  const order: IOrder = {
    userId,
    items: cart.items,
    total: finalTotal,
    discountApplied: cart.discount,
  };
  store.orders.push(order);
  store.carts[userId] = {
    items: [],
    isCouponApplied: false,
    discount: 0,
    discountCode: "",
  };
  return { finalTotal, message: "Checkout successful" };
};

export const apply = (userId: string, discountCode: string) => {
  const cart = store.carts[userId] || {
    items: [],
    isCouponApplied: false,
  };
  if (!cart.items.length) {
    return { finalTotal: 0, success: false };
  }
  console.log("out discount code ", discountCode);
  let discount = 0;
  for (let i = 0; i < store.discountCodes.length; i++) {
    if (store.discountCodes[i] === discountCode) {
      discount = 0.1;
    }
  }
  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log(total);
  if (cart.isCouponApplied) {
    return { finalTotal: total, success: false };
  }
  const finalTotal = total - total * discount;
  console.log("final total before sending is this ", finalTotal);

  cart.isCouponApplied = true;
  cart.discount = total - finalTotal;
  cart.discountCode = discountCode;

  return {
    finalTotal,
    success: true,
  };
};

export const remove = (userId: string, discountCode: string) => {
  const cart = store.carts[userId] || {
    items: [],
    isCouponApplied: false,
  };
  if (!cart.items.length) {
    return { finalTotal: 0, success: false };
  }
  let discount = 0;
  if (store.discountCodes.includes(discountCode)) {
    discount = 0.1; // discount of 10%
  }
  const total = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log(total);
  const finalTotal = total * (1 + discount);
  if (cart.isCouponApplied) {
    cart.isCouponApplied = false;
    cart.discount = 0;
    cart.discountCode = "";
    return { finalTotal: total, success: true };
  }
  return {
    finalTotal,
    success: false,
  };
};
