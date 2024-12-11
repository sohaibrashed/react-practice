import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Rating from "react-rating";
import { Badge } from "./ui/badge";
import AddToCart from "./AddToCart";

export default function ProductCard({ product, onClick }) {
  return (
    <Card
      onClick={() => onClick(product._id)}
      className="group border border-gray-200 rounded-none overflow-hidden bg-white cursor-pointer"
    >
      <div className="relative">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <Button
            variant="outline"
            className="bg-white text-gray-600 hover:text-gray-900"
          >
            <Heart size={20} />
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <Badge>{product.category?.name}</Badge>
            <Badge variant="secondary">{product.subCategory?.name}</Badge>
          </div>
        </div>
        <p className="text-sm text-gray-500 h-10 line-clamp-2 mt-3">
          {product.description}
        </p>

        <div className="mt-2">
          <Rating
            emptySymbol={<Star strokeWidth={0.5} size={16} fill="#fefbfb" />}
            fullSymbol={<Star strokeWidth={0.5} size={16} fill="yellow" />}
            fractions={2}
            initialRating={product.ratings}
            readonly={true}
          />
        </div>

        <div className="mt-2 flex items-center justify-between h-12">
          <span className="text-xl font-semibold text-gray-900">
            ${product.price}
          </span>
          <AddToCart item={product}>
            <ShoppingCart size={20} />
          </AddToCart>
        </div>
      </div>
    </Card>
  );
}
