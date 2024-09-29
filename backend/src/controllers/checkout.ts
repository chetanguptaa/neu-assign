import { Request, Response } from "express";
import { apply, checkout, remove } from "../services/checkout";

export const processCheckout = (req: Request, res: Response) => {
  const { userId } = req.body;
  const { finalTotal, message, success } = checkout(userId);
  res.status(200).json({ finalTotal, message, success });
};

export const applyCoupon = (req: Request, res: Response) => {
  const { userId, discountCode } = req.body;
  const { finalTotal, success } = apply(userId, discountCode);
  res.status(200).json({ finalTotal, success });
};

export const removeCoupon = (req: Request, res: Response) => {
  const { userId, discountCode } = req.body;
  const { finalTotal, success } = remove(userId, discountCode);
  res.status(200).json({ finalTotal, success });
};
