import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [] };

/* helper function for 2 decimal number */

const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            //state the current state of cart
            //action include any data inside payload (here the items that are sending to cart)
            const item = action.payload;

            const existedItem = state.cartItems.find((x) => x._id === item._id); //current id is equal to payload id
            //update the quantity
            if (existedItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existedItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }
            /* calculating item price */
            state.itemsPrice = addDecimals(
                state.cartItems.reduce(
                    (acc, item) => acc + item.price * item.quantity,
                    0
                )
            );
            /* shipping price  */
            state.shippingPrice = addDecimals(state.itemsPrice > 50 ? 0 : 5);

            /* tax price  19%*/
            state.taxPrice = addDecimals(Number(itemsPrice * 0.19).toFixed(2));

            /* total price */

            state.totalPrice = (
                Number(state.itemsPrice) +
                Number(state.shippingPrice) +
                Number(state.taxPrice)
            ).toFixed(2);

            /* add to local storage */

            localStorage.setItem("cart", JSON.stringify(state));
        },
    },
});

//in order to use this addToCart reducer, we need to export it as an action

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
