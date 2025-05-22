
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
            state.loading = false;
            state.error = null;
        },
        setProduct: (state, action) => {
            state.product = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        resetProductState: () => initialState,
    },
});

export const {
    setProducts,
    setProduct,
    setLoading,
    setError,
    resetProductState,
} = productSlice.actions;
export default productSlice.reducer;
