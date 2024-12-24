import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSelector } from "react-redux";
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useGetProductQuery } from "@/services/productsApi";
import { formatPrice } from "@/utils/helper";
import AddToCart from "./AddToCart";
import { useVariantSelector } from "@/hooks/useVariantSelector";
import Rating from "./Ratings";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export default function ProductDetails({ id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { data: { product } = {}, isLoading, isError } = useGetProductQuery(id);

  const cartItem = cartItems.find((item) => item?._id === product?._id) || null;

  const {
    selectedColor,
    selectedSize,
    selectedVariant,
    availableColors,
    availableSizes,
    handleColorChange,
    handleSizeChange,
  } = useVariantSelector(product, cartItem);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">
          Failed to load product data. Please try again later.
        </p>
      </div>
    );
  }

  const isProductPage = location.pathname === `/product/${id}`;

  const handleBuyNow = () => {
    if (!selectedVariant || !selectedVariant.stock) return;
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>

        <Card className="bg-white shadow-md">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-[400px] md:h-[600px] w-full bg-gray-50 rounded-s-lg overflow-hidden">
              {selectedVariant && (
                <Carousel className="w-full h-full">
                  <CarouselContent>
                    {selectedVariant.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="h-[400px] md:h-[600px] w-full relative">
                          <img
                            src={image}
                            alt={`${product.name} - View ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {selectedVariant.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-2" />
                      <CarouselNext className="right-2" />
                    </>
                  )}
                </Carousel>
              )}
            </div>

            <div className="flex flex-col space-y-6 p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  <Badge variant="secondary" className="capitalize">
                    {product.category.name}
                  </Badge>
                </div>
                <Rating
                  average={product.ratings.average}
                  count={product.ratings.count}
                  starSize="h-3.5 w-3.5"
                  className="mb-2"
                />
                {product.price.sale ? (
                  <div>
                    <div className="text-base font-semibold line-through text-gray-500">
                      {formatPrice(product.price.base, product.price.currency)}
                    </div>
                    <div className="text-3xl font-bold text-gray-900">
                      {formatPrice(product.price.sale, product.price.currency)}
                      <span className="text-sm text-green-500 ml-4 font-medium">
                        {product?.discountPercentage}% off
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price.base, product.price.currency)}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map((color) => (
                      <Badge
                        key={color}
                        variant={
                          selectedColor === color ? "default" : "outline"
                        }
                        className="cursor-pointer px-4 py-2"
                        onClick={() => handleColorChange(color)}
                      >
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Size
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map((size) => (
                      <Badge
                        key={size}
                        variant={selectedSize === size ? "default" : "outline"}
                        className="cursor-pointer px-4 py-2"
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Brand: </span>
                    {product.brand.name}
                  </p>
                  {product.materials.length > 0 && (
                    <p>
                      <span className="font-medium">Material: </span>
                      {product.materials.join(", ")}
                    </p>
                  )}
                  {selectedVariant && (
                    <p>
                      <span className="font-medium">Stock: </span>
                      {selectedVariant.stock > 0 ? (
                        <span
                          className={
                            selectedVariant.stock < 10 ? "text-red-500" : ""
                          }
                        >
                          {selectedVariant.stock} available
                        </span>
                      ) : (
                        <span className="text-red-500">Out of stock</span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {isProductPage && (
                <div className="flex flex-col-reverse sm:flex-row gap-4 mt-8">
                  {cartItem && (
                    <Button
                      size="lg"
                      className="flex-1 py-4 bg-pink-600 hover:bg-pink-700 text-white"
                      variant="default"
                      disabled={!selectedVariant || selectedVariant.stock === 0}
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Button>
                  )}

                  <AddToCart
                    size="lg"
                    className="flex-1 py-4"
                    variant="secondary"
                    disabled={!selectedVariant || selectedVariant.stock === 0}
                    item={{
                      ...product,
                      selectedVariant,
                    }}
                  >
                    Add to Cart
                  </AddToCart>
                </div>
              )}
            </div>
            <div className="md:col-span-2 px-6">
              <hr />

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description">
                  <AccordionTrigger className="text-lg font-semibold">
                    Description
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 prose max-w-none">
                    {product.description}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="specifications">
                  <AccordionTrigger className="text-lg font-semibold">
                    Specifications
                  </AccordionTrigger>
                  <AccordionContent>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Brand
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {product.brand.name}
                        </dd>
                      </div>
                      {product.materials.length > 0 && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">
                            Materials
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900">
                            {product.materials.join(", ")}
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Category
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {product.category.name}
                        </dd>
                      </div>
                    </dl>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
