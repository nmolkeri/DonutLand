import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  donuts: [],
  donutCount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { id, name, amount } = action.payload;
      const totalQuantity = state.donuts.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const cartItem = state.donuts.find((item) => item.id == id);
      if (totalQuantity < 24 || (totalQuantity == 24 && amount == -1)) {
        if (cartItem) {
          cartItem.quantity += amount;
          if (cartItem.quantity <= 0) {
            state.donuts = state.donuts.filter((item) => item !== cartItem);
          }
        } else if (amount != -1) {
          state.donuts.push({ id: id, name: name, quantity: 1 });
        }
      }
      state.donutCount = state.donuts.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.donuts = [];
      state.donutCount = 0;
    },
  },
});

export const cartItemsCount = (state) => state.donutCount;
