import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { formatPrice } from "@/utils/helper";
import AddToCart from "./AddToCart";
import { useSelector } from "react-redux";
import { useVariantSelector } from "@/hooks/useVariantSelector";
import Rating from "./Ratings";

export default function ProductCard({ product, onClick }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
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

  if (!selectedVariant) return null;

  return (
    <Card
      onClick={() => onClick?.(product._id)}
      className="group overflow-hidden bg-white transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={selectedVariant?.images[0] || product.variants[0].images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
          <Heart className="h-4 w-4" />
        </Button>
        {product.price.sale && (
          <Badge className="absolute left-2 top-2 bg-red-500">Sale</Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium line-clamp-1">{product.name}</h3>
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

          <div className="flex items-center justify-between">
            <div>
              {product.price.sale ? (
                <div>
                  <div className="text-base font-semibold line-through text-gray-500">
                    {formatPrice(product.price.base, product.price.currency)}
                  </div>
                  <div className="text-lg font-semibold">
                    {formatPrice(product.price.sale, product.price.currency)}
                    <span className="text-sm text-green-500 ml-4 font-medium">
                      {product?.discountPercentage}% off
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-lg font-semibold">
                  {formatPrice(product.price.base, product.price.currency)}
                </div>
              )}
              {selectedVariant?.stock < 10 && (
                <p className="text-xs text-red-500">
                  Only {selectedVariant.stock} left
                </p>
              )}
            </div>

            <AddToCart
              size="sm"
              className="h-8 w-8 p-0"
              item={{
                ...product,
                selectedVariant,
              }}
              disabled={!selectedVariant || selectedVariant.stock === 0}
            >
              <ShoppingCart className="h-4 w-4" />
            </AddToCart>
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-1">Color</h4>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((color) => (
                <Badge
                  key={color}
                  variant={selectedColor === color ? "default" : "outline"}
                  className="cursor-pointer px-2 py-1 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleColorChange(color);
                  }}
                >
                  {color}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium text-gray-700 mb-1">Size</h4>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((size, index) => (
                <Badge
                  key={`${size}-${index}`}
                  variant={selectedSize === size ? "default" : "outline"}
                  className="cursor-pointer px-2 py-1 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSizeChange(size);
                  }}
                >
                  {size}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
