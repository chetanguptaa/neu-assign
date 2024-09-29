"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { SVGProps, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const AddSubButtons = ({
  item,
  onUpdate,
}: {
  item: { quantity: number; productId: number; price: number };
  onUpdate: () => void;
}) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const { toast } = useToast();

  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:8000/cart/add", {
        userId: 1,
        productId: item.productId,
        quantity: 1,
        price: item.price,
      });
      if (response.data.success) {
        setQuantity((prevQuantity) => prevQuantity + 1);
        onUpdate();
        toast({
          title: "Added to cart successfully",
        });
      } else {
        toast({
          title: "Some error occoured",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred, please try again later",
        variant: "destructive",
      });
    }
  };

  const handleSubtract = async () => {
    if (quantity >= 1) {
      try {
        const response = await axios.post("http://localhost:8000/cart/remove", {
          userId: 1,
          productId: item.productId,
          quantity: 1,
        });
        if (response.data.success) {
          setQuantity((prevQuantity) => prevQuantity - 1);
          onUpdate();
          toast({
            title: "Removed from cart successfully",
          });
        } else {
          toast({
            title: "Some error occoured",
          });
        }
      } catch (error) {
        console.error("Error subtracting product from cart:", error);
        toast({
          title: "An error occurred, please try again later",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        size="icon"
        variant="outline"
        onClick={handleSubtract}
        disabled={quantity <= 0}
      >
        <MinusIcon className="w-4 h-4" />
      </Button>
      <span>{quantity}</span>
      <Button size="icon" variant="outline" onClick={handleAdd}>
        <PlusIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default AddSubButtons;

function MinusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
