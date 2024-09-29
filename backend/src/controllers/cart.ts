import { Request, Response } from "express";
import { addItemToCart, getCart, removeItemFromCart } from "../services/cart";

export const addItem = (req: Request, res: Response) => {
  const { userId, productId, quantity, price } = req.body;
  const cart = addItemToCart(userId, productId, quantity, price);
  res.status(200).json({ message: "Item added to cart", cart });
};

export const removeItem = (req: Request, res: Response) => {
  const { userId, productId, quantity } = req.body;
  const cart = removeItemFromCart(userId, productId, quantity);
  res.status(200).json({ message: "Item removed from cart", cart });
};

export const getUserCart = (req: Request, res: Response) => {
  const { userId } = req.query;
  const cart = getCart(userId as string);
  res.status(200).json({ cart });
};
