import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Product from "@/components/product";

export default async function Home() {
  const callAPIs = async (): Promise<{
    products: {
      id: number;
      name: string;
      description: string;
      price: number;
    }[];
    cart: {
      items: {
        productId: number;
        quantity: number;
        price: number;
      }[];
      discount: number;
    };
  }> => {
    try {
      const res1 = await axios.get("http://localhost:8000/product");
      const res2 = await axios.get("http://localhost:8000/cart?userId=1");
      return {
        products: res1.data.products,
        cart: res2.data.cart,
      };
    } catch (err) {
      console.log(err);
      return {
        products: [],
        cart: {
          items: [],
          discount: 0,
        },
      };
    }
  };
  const { products, cart } = await callAPIs();
  return (
    <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="w-full py-12 md:pt-24 lg:pt-32 border-y">
          <div className="container space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col space-y-4">
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Hydrate in Style with Our Premium Water Bottles
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover our collection of durable, eco-friendly water bottles
                  that keep your drinks refreshing all day long.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
              <Image
                src="/water1.jpg"
                width="1270"
                height="550"
                alt="Hero"
                className="mx-auto aspect-[3/2] overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid gap-6 md:gap-8 px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
              <div className="grid gap-1">
                <h2 className="text-2xl font-bold tracking-tight">
                  Featured Water Bottles
                </h2>
                <p className="text-muted-foreground">
                  Discover our top-selling water bottles for your hydration
                  needs.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((item) => (
                <Product
                  cartItem={
                    cart.items.find((ci) => ci.productId === item.id) || null
                  }
                  key={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  id={item.id}
                  img="/stainless.webp"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
