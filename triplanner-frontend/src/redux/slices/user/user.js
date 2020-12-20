import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',

    initialState: {
        user: null,
        token: localStorage.getItem('token'),
        isLoggedIn: false,
        location: null,
    },

    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
        },

        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },

        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },

        setLocation: (state, action) => {
            state.location = action.payload;
        },
    }
});

export const {
    setUser,
    setToken,
    setIsLoggedIn,
    setLocation
} = userSlice.actions;

export const selectUser = state => state.user.user;
export const selectToken = state => state.user.token;
export const selectIsLoggedIn = state => state.user.isLoggedIn;
export const selectLocation = state => state.user.location;

export default userSlice.reducer;