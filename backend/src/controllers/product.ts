import { Request, Response } from "express";
import { getAllProducts } from "../services/product";

export const getProducts = (req: Request, res: Response) => {
  const { products } = getAllProducts();
  res.status(200).json({ products });
};
