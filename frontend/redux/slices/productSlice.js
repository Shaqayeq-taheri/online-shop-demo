import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    error: null,
    productDetails: {
        product: {},
        loading: false,
        error: null,
    },
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        //for homepage (list of products)
        setProducts(state, action) {
            state.products = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        // for product details
        setProductDetails(state, action) {
            state.productDetails.product = action.payload;
        },
        setProductDetailsLoading(state, action) {
            state.productDetails.loading = action.payload;
        },
        setProductDetailsError(state, action) {
            state.productDetails.error = action.payload;
        },
    },
});

export const {
    setProducts,
    setLoading,
    setError,
    setProductDetails,
    setProductDetailsLoading,
    setProductDetailsError,
} = productSlice.actions;

export default productSlice.reducer;
