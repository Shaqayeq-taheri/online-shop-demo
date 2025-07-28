import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems: [],
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        fetchOrdersRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchOrdersSuccess: (state, action) => {
            state.orderItems = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchOrdersFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFail } =
    orderSlice.actions;
    
export default orderSlice.reducer;
