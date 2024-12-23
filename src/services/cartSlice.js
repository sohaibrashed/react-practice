import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const { selectedVariant } = item;

      const existingItem = state.cartItems.find(
        (cartItem) =>
          cartItem._id === item._id &&
          cartItem.selectedVariant._id === selectedVariant._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const { _id } = action.payload;

      state.cartItems = state.cartItems.filter((item) => item._id !== _id);

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    incrementQuantityOfItem: (state, action) => {
      const { _id } = action.payload;

      const item = state.cartItems.find((cartItem) => cartItem._id === _id);
      if (item && item.stock > item.quantity) {
        item.quantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    decrementQuantityOfItem: (state, action) => {
      const { _id } = action.payload;

      const item = state.cartItems.find((cartItem) => cartItem._id === _id);
      if (item) {
        item.quantity -= 1;

        if (item.quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (cartItem) => cartItem._id !== _id
          );
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    resetCart: (state) => {
      state.cartItems = [];

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantityOfItem,
  decrementQuantityOfItem,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
