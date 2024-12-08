import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";
import Rating from "react-rating";
import { Badge } from "./ui/badge";
import AddToCart from "./AddToCart";

export default function VerticalProductCard({ product, onClick }) {
  return (
    <Card
      onClick={() => onClick(product._id)}
      className="group border border-gray-200 rounded-lg overflow-hidden bg-white cursor-pointer flex flex-col items-center sm:flex-row sm:items-stretch sm:gap-2"
    >
      <div className="relative w-full sm:w-1/3 h-72 sm:h-auto">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
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

      <div className="p-4 flex-1 flex flex-col justify-between w-full sm:w-2/3">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {product.name.length > 30
                ? `${product.name.slice(0, 30)}...`
                : product.name}
            </h3>
            <div className="flex items-center gap-2">
              <Badge>{product.category}</Badge>
              <Badge variant="secondary">{product.subCategory}</Badge>
            </div>
          </div>
          <p className="text-sm text-gray-500 line-clamp-3 h-10">
            {product.description}...
          </p>
        </div>

        <div className="flex justify-between items-center mt-4">
          <Rating
            emptySymbol={<Star strokeWidth={0.5} size={16} fill="#fefbfb" />}
            fullSymbol={<Star strokeWidth={0.5} size={16} fill="yellow" />}
            fractions={2}
            initialRating={product.ratings}
            readonly={true}
          />
          <span className="text-xl font-semibold text-gray-900">
            ${product.price}
          </span>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500 line-clamp-1">
            <strong>Brand:</strong> {product.brand} ...
          </p>
          {product.material && (
            <p className="text-sm text-gray-500 line-clamp-1">
              <strong>Material:</strong> {product.material}
            </p>
          )}
          <p className="text-sm text-gray-500">
            <strong>Stock:</strong>{" "}
            {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
          </p>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <AddToCart item={product}>
            <ShoppingCart size={20} className="mr-2" /> Add to Cart
          </AddToCart>
        </div>
      </div>
    </Card>
  );
}
