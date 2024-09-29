"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const Coupon = ({
  cart,
  onUpdate,
}: {
  cart: {
    items: {
      productId: number;
      quantity: number;
      price: number;
      name: string;
    }[];
    discount: number;
  };
  onUpdate: () => void;
}) => {
  const { toast } = useToast();
  const [couponCode, setCouponCode] = useState("");

  const calculateTotal = useCallback(() => {
    return cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart]);

  const finalTotal = calculateTotal() - cart.discount;

  useEffect(() => {
    const getCouponCode = async () => {
      const res = await axios.post(
        "http://localhost:8000/admin/generate-discount"
      );
      if (res.data.code) {
        toast({
          title: "Congratulation, you got a coupon",
        });
        setCouponCode(res.data.code);
      } else {
        setCouponCode("");
      }
    };
    getCouponCode();
    return () => {
      const removeCoupon = async () => {
        await axios.post("http://localhost:8000/checkout/remove-coupon", {
          userId: 1,
          discountCode: couponCode,
        });
      };
      removeCoupon();
    };
  }, [toast]);
  const applyCoupon = async () => {
    const res = await axios.post(
      "http://localhost:8000/checkout/apply-coupon",
      {
        userId: 1,
        discountCode: couponCode,
      }
    );
    if (res.data.success) {
      onUpdate();
      toast({
        title: "Coupon applied successfully",
      });
    } else {
      toast({
        title: "Invalid coupon",
        description: "The coupon code you entered is not valid.",
        variant: "destructive",
      });
    }
    setCouponCode("");
  };

  const handleBuy = async () => {
    const res = await axios.post("http://localhost:8000/checkout", {
      userId: 1,
    });
    if (res.data) {
      toast({
        title: "Order created successfully",
      });
    } else {
      toast({
        title: "Some error occured, please try again later",
        description: "The coupon code you entered is not valid.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Enter coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          className="max-w-xs"
        />
        <Button onClick={applyCoupon}>Apply Coupon</Button>
      </div>
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="text-2xl font-bold">
            Total: ${finalTotal.toFixed(2)}
          </div>
          {
            <div className="text-muted-foreground text-sm">
              Original price: ${calculateTotal().toFixed(2)}
            </div>
          }
        </div>
        <Button size="lg" onClick={handleBuy}>
          Buy Now
        </Button>
      </div>
    </div>
  );
};

export default Coupon;
