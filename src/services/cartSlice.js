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
      const item = action.payload;
      const { selectedVariant } = item;

      state.cartItems = state.cartItems.filter(
        (cartItem) =>
          !(
            cartItem._id === item._id &&
            cartItem.selectedVariant?._id === selectedVariant?._id
          )
      );

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    incrementQuantityOfItem: (state, action) => {
      const item = action.payload;
      const { selectedVariant } = item;

      const existingItem = state.cartItems.find(
        (cartItem) =>
          cartItem._id === item._id &&
          cartItem.selectedVariant._id === selectedVariant._id
      );
      if (
        existingItem &&
        existingItem.selectedVariant.stock > existingItem.quantity
      ) {
        existingItem.quantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    decrementQuantityOfItem: (state, action) => {
      const item = action.payload;
      const { selectedVariant } = item;

      const existingItem = state.cartItems.find(
        (cartItem) =>
          cartItem._id === item._id &&
          cartItem.selectedVariant._id === selectedVariant._id
      );
      if (existingItem) {
        existingItem.quantity -= 1;

        if (existingItem.quantity <= 0) {
          state.cartItems = state.cartItems.filter(
            (cartItem) =>
              !(
                cartItem._id === item._id &&
                cartItem.selectedVariant?._id === selectedVariant?._id
              )
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
