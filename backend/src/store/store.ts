import { IProduct, IOrder, ICart } from "../types";

export const store = {
  carts: {} as { [userId: string]: ICart },
  orders: [] as IOrder[],
  discountCodes: [] as string[],
  orderCount: 0,
  nthOrderDiscount: 10,
  products: [
    {
      id: 1,
      name: "Insulated water bottle",
      description: "Keeps beverages cold for 24 hours",
      price: 29.99,
    },
    {
      id: 2,
      name: "Aluminium water bottle",
      description: "Lightweight and durable",
      price: 19.99,
    },
    {
      id: 3,
      name: "Glass water bottle",
      description: "Eco-friendly and reusable",
      price: 24.99,
    },
    {
      id: 4,
      name: "Stainless steel water bottle",
      description: "Rust-resistant and stylish",
      price: 34.99,
    },
    {
      id: 5,
      name: "Plastic water bottle",
      description: "Affordable and BPA-free",
      price: 9.99,
    },
  ] as IProduct[],
};
