import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { removeFromCart } from "@/services/cartSlice";
import AddToCart from "./AddToCart";

export default function CartDrawer() {
  const items = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const calculateTotal = (items) => {
    return items
      .reduce((acc, item) => acc + item.price.base * item.quantity, 0)
      .toFixed(2);
  };

  const handleDeletion = (item) => {
    dispatch(removeFromCart(item));
  };

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
          Review your selected items and proceed to checkout.
        </SheetDescription>
      </SheetHeader>
      <div className="p-4 flex-1">
        {items.length === 0 ? (
          <p className="text-gray-600 text-center mt-10">Your cart is empty.</p>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              <div className="flex items-center gap-2">
                <img
                  src={item.variants[0]?.images[0] || "/placeholder.jpg"}
                  alt={item.name || "Product Image"}
                  className="w-24 h-36 object-cover rounded-lg"
                />

                <div className="flex flex-col items-start gap-2">
                  <h4 className="font-medium text-gray-800 line-clamp-1">
                    {item.name || "Unnamed Product"}
                  </h4>

                  <p className="text-gray-600 text-sm">
                    {item.quantity} × ${item.price.base.toFixed(2)}
                  </p>

                  <div className="flex items-center gap-8">
                    <AddToCart item={item} />

                    <button
                      onClick={() => handleDeletion(item)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="p-4 border-t">
          <div className="flex justify-between mb-4">
            <span className="text-gray-800 font-medium">Total</span>
            <span className="text-gray-800 font-semibold">
              $ {calculateTotal(items)}
            </span>
          </div>
          <Link to={"/checkout"}>
            <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
              Proceed to Checkout
            </Button>
          </Link>
        </div>
      )}
    </SheetContent>
  );
}
