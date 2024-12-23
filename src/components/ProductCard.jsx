import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";

export default function ProductCard({ product, onClick }) {
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "EUR",
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Card
      onClick={() => onClick?.(product._id)}
      className="group overflow-hidden bg-white transition-all duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.variants[0].images[0]}
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

          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < product.ratings.average
                      ? "fill-yellow-400 stroke-yellow-400"
                      : "fill-gray-200 stroke-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.ratings.count})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-semibold">
                {formatPrice(product.price.base, product.price.currency)}
              </div>
              {product.variants[0].stock < 10 && (
                <p className="text-xs text-red-500">
                  Only {product.variants[0].stock} left
                </p>
              )}
            </div>
            <Button size="sm" className="h-8 w-8 p-0">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
