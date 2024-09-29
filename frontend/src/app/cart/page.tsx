"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import AddSubButtons from "./_components/add-sub-buttons";
import Coupon from "./_components/coupon";

export default function Cart() {
  const [cart, setCart] = useState<{
    items: {
      productId: number;
      quantity: number;
      price: number;
      name: string;
    }[];
    discount: number;
  }>({ items: [], discount: 0 });

  const callAPI = async () => {
    try {
      const res = await axios.get("http://localhost:8000/cart?userId=1");
      setCart(res.data.cart);
    } catch (err) {
      console.log(err);
      setCart({ items: [], discount: 0 });
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 border-y">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="grid gap-8">
        {cart.items.map((item) => (
          <div
            key={item.productId}
            className="grid grid-cols-[100px_1fr_100px] items-center gap-4 md:gap-6"
          >
            <Image
              src="/stainless.webp"
              alt="bottle"
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
            <div className="grid gap-1">
              <h3 className="font-medium">{item.name}</h3>
              <AddSubButtons item={item} onUpdate={callAPI} />
            </div>
            <div className="text-right">
              <div className="font-medium">${item.price.toFixed(2)}</div>
              <div className="text-muted-foreground">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center">
        <Coupon cart={cart} onUpdate={callAPI} />
      </div>
    </div>
  );
}
