import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: [],
    },
    reducers: {
        ADD_TO_CART: (state, action) => {
            const itemToAdd = action.payload;
            const existingItem = state.value.find(item => item.id === itemToAdd.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.value.push({ ...itemToAdd, quantity: 1 });
            }
        },

        REMOVE_FROM_CART: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter(item => item.id !== id);
        },
        increaseQuantity(state, action) {
            const item = state.value.find(product => product.id === action.payload);
            item.quantity += 1;
        },
        decreaseQuantity(state, action) {
            const item = state.value.find(product => product.id === action.payload);
            item.quantity > 1 && (item.quantity -= 1);
        },
    }   
})

export const { ADD_TO_CART, REMOVE_FROM_CART,increaseQuantity, decreaseQuantity } = CartSlice.actions

export default CartSlice.reducer