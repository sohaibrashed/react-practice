import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantityOfItem,
  incrementQuantityOfItem,
} from "@/services/cartSlice";
import { MinusCircleIcon, PlusCircleIcon } from "lucide-react";
import { useState } from "react";

export default function AddToCart({ className = "", size, children, item }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const itemInCart = cartItems.find((product) => product._id === item._id);

  const handleAddToCart = () => {
    if (!item) return;

    if (!itemInCart) {
      const updatedItem = { ...item, quantity: 1 };
      dispatch(addToCart(updatedItem));
    }
  };

  if (itemInCart) {
    const { quantity } = itemInCart;

    return (
      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(decrementQuantityOfItem(itemInCart));
          }}
        >
          <MinusCircleIcon className="text-gray-400 hover:fill-black hover:stroke-white" />
        </button>
        <span>{quantity}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(incrementQuantityOfItem(itemInCart));
          }}
        >
          <PlusCircleIcon className="text-gray-400 hover:fill-black hover:stroke-white" />
        </button>
      </div>
    );
  }

  return (
    <Button
      size={size}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCart();
      }}
    >
      {children}
    </Button>
  );
}
