import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/utils/helper";
import AddToCart from "./AddToCart";

export default function VerticalProductCard({ product, onClick, handleFav }) {
  const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
  const currentVariant = product.variants[currentVariantIndex];

  return (
    <Card
      className="group w-full max-w-2xl mx-auto overflow-hidden"
      onClick={(e) => {
        e.stopPropagation();
        onClick(product._id);
      }}
    >
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2">
          <div className="relative h-[400px] w-full">
            <Carousel className="w-full h-full">
              <CarouselContent asChild>
                {currentVariant.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="h-[400px] w-full relative">
                      <img
                        src={image}
                        alt={`${product.name} - View ${index + 1}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handle(product._id);
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious />
              <CarouselNext /> */}
            </Carousel>

            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white/90"
              onClick={(e) => {
                e.stopPropagation();
                handleFav(product._id);
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 flex flex-col gap-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold text-xl leading-tight line-clamp-1">
                  {product.name}
                </h2>
                <Badge variant="secondary" className="capitalize line-clamp-1">
                  {product.category.name}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < product.ratings.average
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "fill-gray-200 stroke-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.ratings.count} reviews)
                </span>
              </div>

              <div className="text-2xl font-bold">
                {formatPrice(product.price.base, product.price.currency)}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(product.variants.map((v) => v.size))).map(
                    (size) => (
                      <Badge
                        key={size}
                        variant="outline"
                        className="cursor-pointer hover:bg-gray-100"
                      >
                        {size}
                      </Badge>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(
                    new Set(product.variants.map((v) => v.color))
                  ).map((color) => (
                    <Badge
                      key={color}
                      variant="outline"
                      className="cursor-pointer hover:bg-gray-100 line-clamp-1"
                    >
                      {color}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="text-sm text-gray-500 space-y-1">
                <p className="line-clamp-1">
                  <span className="font-medium">Brand:</span>{" "}
                  {product.brand.name}
                </p>
                {product.materials.length > 0 && (
                  <p className="line-clamp-1">
                    <span className="font-medium">Material:</span>{" "}
                    {product.materials.join(", ")}
                  </p>
                )}
                <p className="line-clamp-1">
                  <span className="font-medium">Stock:</span>{" "}
                  {currentVariant.stock} available
                </p>
              </div>
            </div>

            <AddToCart item={product} className="w-full">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </AddToCart>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
