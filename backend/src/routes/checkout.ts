import express from "express";
import {
  applyCoupon,
  processCheckout,
  removeCoupon,
} from "../controllers/checkout";

const checkoutRouter = express.Router();

checkoutRouter.post("/", processCheckout);
checkoutRouter.post("/apply-coupon", applyCoupon);
checkoutRouter.post("/remove-coupon", removeCoupon);

export default checkoutRouter;
