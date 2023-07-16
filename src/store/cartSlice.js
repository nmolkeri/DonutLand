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
            const cartItem = state.donuts.find((item) => item.product === id);
            console.log(state.donuts);
            if(totalQuantity <= 24) {
                if(cartItem) {
                    cartItem.quantity += amount
                    if(cartItem.quantity <= 0){
                        state.donuts = state.donuts.filter((item) => item !== cartItem);
                    }
                } else if (amount != -1) {
                    state.donuts.push({id: id, name: name, quantity: 1});
                }
            }
        },

        changeQuantity: (state, action) => {
            const {productId, amount} = action.payload;
            const cartItem = state.donuts.find((item) => item.product.id === productId);

            if(cartItem) {
                cartItem.quantity += amount
            }

            if(cartItem.quantity <= 0){
                state.donuts = state.donuts.filter((item) => item !== cartItem);
            }
        }
    }
});

export const selectNumberOfItems = (state) => state.cart.items.length;