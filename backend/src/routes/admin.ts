import express from "express";
import { generateDiscountCode, getAdminReport } from "../controllers/admin";

const adminRouter = express.Router();

adminRouter.post("/generate-discount", generateDiscountCode);
adminRouter.get("/report", getAdminReport);

export default adminRouter;
