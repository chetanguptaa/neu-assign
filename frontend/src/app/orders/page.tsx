"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Component() {
  return (
    <section className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-2xl font-bold mb-6 flex items-center space-x-4  ">
        <h1>All Orders</h1> <div className=" p-1 border rounded-md">{6}</div>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[].map(
          (order: {
            id: string;
            product_name: string;
            product_description: string;
            product_price: string;
          }) => (
            <Card
              key={order.id}
              className="overflow-hidden shadow-lg rounded-lg"
            >
              <Image
                src="/stainless.webp"
                alt={order.product_name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4 flex flex-col h- justify-between">
                <div>
                  <h3 className="text-lg font-semibold truncate mb-2">
                    {order.product_name}
                  </h3>
                  <p className="text-sm truncate text-muted-foreground mb-4">
                    {order.product_description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    ${order.product_price}
                  </span>
                  <Button variant="outline" size="sm">
                    View Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
}
