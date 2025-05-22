// src/store.js
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
       /*  products: productReducer, */
        // Add other reducers here like user, order, cart, etc.
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
