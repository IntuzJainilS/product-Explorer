import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
        ADD_TO_CART: (state, action) => {
            const itemToAdd = action.payload;
            const existingItem = state.cartItems.find(item => item.id === itemToAdd.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...itemToAdd, quantity: 1 });
            }
        },

        REMOVE_FROM_CART: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(item => item.id !== id);
        },
        increaseQuantity(state, action) {
            const item = state.cartItems.find(product => product.id === action.payload);
            item.quantity += 1;
        },
        decreaseQuantity(state, action) {
            const item = state.cartItems.find(product => product.id === action.payload);
            item.quantity > 1 && (item.quantity -= 1);
        },
    }   
})

export const { ADD_TO_CART, REMOVE_FROM_CART,increaseQuantity, decreaseQuantity } = CartSlice.actions

export default CartSlice.reducer