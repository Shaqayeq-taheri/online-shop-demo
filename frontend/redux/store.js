
import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import userReducer from './slices/userSlice'



const store = configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer, 
        user:userReducer,     
    },
    devTools: true,
});

export default store;

/* import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../src/slices/apiSlice";

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default store;
 */
