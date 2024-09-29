import { Request, Response } from "express";
import { generateDiscount, getReport } from "../services/admin";

export const generateDiscountCode = (req: Request, res: Response) => {
  const result = generateDiscount();
  res.status(200).json(result);
};

export const getAdminReport = (req: Request, res: Response) => {
  const report = getReport();
  res.status(200).json(report);
};
