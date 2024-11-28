import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <Card className="border border-gray-200 rounded-lg shadow-md overflow-hidden bg-white">
      <div className="relative">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <Button
            variant="outline"
            className="bg-white text-gray-600 hover:text-gray-900"
          >
            <Heart size={20} />
          </Button>
          {/* <Button
            variant="outline"
            className="bg-white text-gray-600 hover:text-gray-900"
          >
            <ShoppingCart size={20} />
          </Button> */}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 h-10 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-semibold text-gray-900">
            ${product.price}
          </span>
          <Button className="bg-slate-950 text-white hover:bg-slate-900">
            <ShoppingCart size={20} />
          </Button>
        </div>
      </div>
    </Card>
  );
}
