import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderItems :[],
    loading:false,
    error:null
    
}


const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        
    }
})