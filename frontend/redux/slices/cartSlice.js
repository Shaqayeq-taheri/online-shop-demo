import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../src/utils/cartUtils";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart")) //if there is an item in cart, parse the Json to an object
    : { cartItems: [], shippingAddress: {}, paymentMethod: "paypal" }; //if there is not, create an empty items array

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            //state the current state of cart
            //action include any data inside payload (here the items that are sending to cart)
            const item = action.payload; //Gets the item from action payload

            //Checks if item already exists in cart
            const existedItem = state.cartItems.find((x) => x._id === item._id); //current id is equal to payload id
            //update the quantity
            if (existedItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existedItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (x) => x._id !== action.payload
            ); // return the cartItems that their id is not equel to action(action is the item that we want to delete)
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCart: (state) => {
            state.cartItems = [];
            return updateCart(state);
        },
    },
});

//in order to use this addToCart reducer, we need to export it as an action

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
