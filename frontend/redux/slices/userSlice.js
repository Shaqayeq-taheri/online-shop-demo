import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //if there is a user in local storage, if not null
    currentUser: localStorage.getItem("currentUser")
        ? JSON.parse(localStorage.getItem("currentUser"))
        : null,
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //sign in and up , save the user in localstorage
        setCredentials: (state, action) => {
            state.currentUser = action.payload;
            localStorage.setItem("currentUser", JSON.stringify(action.payload));
        },
        logout: (state) => {
            (state.currentUser = null), localStorage.removeItem("currentUser");
        },
    },
});


export const { setCredentials, logout} = userSlice.actions

export default userSlice.reducer;

