import { useGetTrendingProductsQuery } from "@/services/productsApi";
import ProductCard from "./ProductCard";
import LoadingSpinner from "./ui/loadingSpinner";
import { useNavigate } from "react-router";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useEffect, useState } from "react";
import VerticalProductCard from "./VerticalProductCard";

export default function TrendingProducts() {
  const [api, setApi] = useState();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetTrendingProductsQuery();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={60} />
      </div>
    );
  }

  const handleProduct = (id) => {
    navigate(`/product/${id}`);
  };

  console.log(data);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl sm:text-4xl md:text-5xl text-slate-900 font-semibold mb-6 relative after:absolute after:left-0 after:bottom-0 after:w-16 after:h-1 after:bg-pink-600 after:rounded-full">
        Trending Products
      </h2>
      <div>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {data.products.map((product) => (
              <CarouselItem
                key={product._id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <VerticalProductCard
                  key={product._id}
                  product={product}
                  onClick={handleProduct}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            className={
              "bg-pink-300 text-white hover:bg-white hover:text-pink-300 lg:h-14 lg:w-14 "
            }
          />
          <CarouselPrevious
            className={
              "bg-pink-300 text-white hover:bg-white hover:text-pink-300 lg:h-14 lg:w-14"
            }
          />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
        {isError && "Something went wrong"}
      </div>
    </div>
  );
}
