import { store } from "../store/store";

export const generateDiscount = (): {
  message: string;
  code?: string;
  success: boolean;
} => {
  if (store.orderCount % store.nthOrderDiscount === 0) {
    const newCode = `DISCOUNT${store.orderCount}`;
    store.discountCodes.push(newCode);
    return {
      message: "Discount code generated",
      code: newCode,
      success: true,
    };
  }
  return { message: "Discount not available yet", success: false };
};

export const getReport = () => {
  const totalRevenue = store.orders.reduce(
    (sum, order) => sum + order.total,
    0
  );
  const totalDiscounts = store.orders.reduce(
    (sum, order) => sum + (order.discountApplied || 0),
    0
  );
  return {
    totalOrders: store.orders.length,
    totalRevenue,
    totalDiscounts,
    issuedDiscountCodes: store.discountCodes,
  };
};
