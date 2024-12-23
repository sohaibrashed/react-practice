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
import LoadingSpinner from "@/components/ui/loadingSpinner";
import { useGetProductQuery } from "@/services/productsApi";
import { formatPrice } from "@/utils/helper";
import AddToCart from "./AddToCart";

export default function ProductDetails({ id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { data: { product } = {}, isLoading, isError } = useGetProductQuery(id);

  // Initialize default selections when product data loads
  useEffect(() => {
    if (product?.variants?.length > 0) {
      const firstVariant = product.variants[0];
      setSelectedColor(firstVariant.color);
      setSelectedSize(firstVariant.size);
      setSelectedVariant(firstVariant);
    }
  }, [product]);

  // Get available sizes for selected color
  const getAvailableSizes = (color) => {
    return (
      product?.variants.filter((v) => v.color === color).map((v) => v.size) ||
      []
    );
  };

  // Get variant by color and size
  const getVariant = (color, size) => {
    return product?.variants.find((v) => v.color === color && v.size === size);
  };

  // Handle color selection
  const handleColorChange = (color) => {
    setSelectedColor(color);
    const sizes = getAvailableSizes(color);
    setSelectedSize(sizes[0]); // Select first available size
    setSelectedVariant(getVariant(color, sizes[0]));
  };

  // Handle size selection
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setSelectedVariant(getVariant(selectedColor, size));
  };

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
  const availableColors = [...new Set(product.variants.map((v) => v.color))];
  const availableSizes = getAvailableSizes(selectedColor);

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
          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="relative h-[400px] md:h-[600px] w-full bg-gray-50 rounded-lg overflow-hidden">
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

            <div className="flex flex-col space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                  <Badge variant="secondary" className="capitalize">
                    {product.category.name}
                  </Badge>
                </div>

                <p className="text-gray-600">{product.description}</p>

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

                <div className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price.base, product.price.currency)}
                </div>
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
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button
                    size="lg"
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                    variant="default"
                    disabled={!selectedVariant || selectedVariant.stock === 0}
                    onClick={() => navigate("/checkout")}
                  >
                    Buy Now
                  </Button>

                  <AddToCart
                    size="lg"
                    className="flex-1"
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
          </div>
        </Card>
      </div>
    </div>
  );
}
