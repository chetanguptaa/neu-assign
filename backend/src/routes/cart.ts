import express from "express";
import { addItem, getUserCart, removeItem } from "../controllers/cart";

const cartRouter = express.Router();

cartRouter.post("/add", addItem);
cartRouter.post("/remove", removeItem);
cartRouter.get("/", getUserCart);

export default cartRouter;
