import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

export default function CartDrawer({ items }) {
  const calculateTotal = () => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <SheetContent className="w-80">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
          Review your selected items and proceed to checkout.
        </SheetDescription>
      </SheetHeader>

      <div className="p-4 flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-gray-600 text-center mt-10">Your cart is empty.</p>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-600">
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex justify-between mb-4">
          <span className="text-gray-800 font-medium">Total</span>
          <span className="text-gray-800 font-semibold">
            ${calculateTotal()}
          </span>
        </div>
        <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white">
          Proceed to Checkout
        </Button>
      </div>
    </SheetContent>
  );
}
