import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    donuts: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addItemToCart: (state, action) => {
            const {id, name, amount} = action.payload;
            const totalQuantity = state.donuts.reduce((total, item) => total + item.quantity, 0);
            const cartItem = state.donuts.find((item) => item.id == id);
            console.log("before")
            console.log(state.donuts);
            if(totalQuantity < 24 || (totalQuantity == 24 && amount == -1)) {
                if(cartItem) {
                    cartItem.quantity += amount
                    if(cartItem.quantity <= 0){
                        state.donuts = state.donuts.filter((item) => item !== cartItem);
                    }
                } else if (amount != -1) {
                    state.donuts.push({id: id, name: name, quantity: 1});
                }
            }
            
            console.log("after")
            console.log(state.donuts);
        },

        clearCart: (state, action) => {
            state.donuts = [];
        }
    }
});

export const selectNumberOfItems = (state) => state.cart.items.length;