"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { SVGProps, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export default function Product({
  id,
  name,
  price,
  description,
  img,
  cartItem,
}: {
  id: number;
  name: string;
  price: number;
  description: string;
  img: string;
  cartItem: { productId: number; quantity: number; price: number } | null;
}) {
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);
  const toast = useToast();
  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:8000/cart/add", {
        userId: 1,
        productId: id,
        quantity: 1,
        price,
      });
      if (response.data) {
        setQuantity((prevQuantity) => prevQuantity + 1);
      }
      toast.toast({
        title: "Added to cart successfully",
      });
    } catch (error) {
      console.log(error);
      toast.toast({
        title: "An error occoured, please try again later",
        variant: "destructive",
      });
    }
  };

  const handleSubtract = async () => {
    if (quantity >= 1) {
      try {
        const response = await axios.post("http://localhost:8000/cart/remove", {
          userId: 1,
          productId: id,
          quantity: 1,
        });
        if (response.data) {
          setQuantity((prevQuantity) => prevQuantity - 1);
        }
        toast.toast({
          title: "Removed from cart successfully",
        });
      } catch (error) {
        console.error("Error subtracting product from cart:", error);
        toast.toast({
          title: "An error occoured, please try again later",
          variant: "destructive",
        });
      }
    }
  };
  return (
    <div className="grid gap-4">
      <div className="grid gap-2.5 relative group">
        <Link href="#" className="absolute inset-0 z-10" prefetch={false}>
          <span className="sr-only">View</span>
        </Link>
        <Image
          src={img}
          alt="Stainless Steel Water Bottle"
          width={200}
          height={200}
          className="rounded-lg object-cover w-full aspect-square group-hover:opacity-50 transition-opacity"
        />
        <div className="grid gap-1">
          <div className="flex items-center gap-4">
            <h3 className="font-semibold">{name}</h3>
            <h4 className="font-semibold ml-auto">${price}</h4>
          </div>
          <p className="text-sm leading-none">{description}</p>
        </div>
      </div>
      {
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            disabled={quantity <= 0}
            onClick={handleSubtract}
          >
            <MinusIcon className="w-4 h-4" />
          </Button>
          <span>{quantity}</span>
          <Button size="icon" variant="outline" onClick={handleAdd}>
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      }
    </div>
  );
}

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
