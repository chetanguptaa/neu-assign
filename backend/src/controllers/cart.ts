import { Request, Response } from "express";
import { addItemToCart, getCart, removeItemFromCart } from "../services/cart";

export const addItem = (req: Request, res: Response) => {
  const { userId, productId, quantity, price } = req.body;
  const { success } = addItemToCart(userId, productId, quantity, price);
  if (success) {
    res.status(200).json({ message: "Item added to cart", success });
  } else {
    res.status(400).json({ message: "Some error occured" });
  }
};

export const removeItem = (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  const { success } = removeItemFromCart(userId, productId, quantity);
  if (success) {
    res.status(200).json({ message: "Item removed from cart", success });
  } else {
    res.status(400).json({ message: "Some error occured" });
  }
};

export const getUserCart = (req: Request, res: Response) => {
  const { userId } = req.query;
  const cart = getCart(userId as string);
  res.status(200).json({ cart });
};
