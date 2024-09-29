import { config } from "dotenv";
config();
import express, { Express } from "express";
import cors from "cors";
import adminRouter from "./routes/admin";
import cartRouter from "./routes/cart";
import checkoutRouter from "./routes/checkout";
import productRouter from "./routes/product";

const PORT = process.env.PORT || 8000;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);
app.use("/admin", adminRouter);
app.use("/product", productRouter);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
