import { store } from "../store/store";

export const getAllProducts = () => {
  return {
    products: store.products,
  };
};
