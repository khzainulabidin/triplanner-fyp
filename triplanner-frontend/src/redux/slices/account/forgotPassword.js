import {createSlice} from "@reduxjs/toolkit";

const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',

    initialState:{
        email: '',
        password: '',
        confirmPassword: '',
    },

    reducers:{
        setEmail: (state, action) => {
            state.email = action.payload;
        },

        setPassword: (state, action) => {
            state.password = action.payload;
        },

        setConfirmPassword: (state, action) => {
            state.confirmPassword = action.payload;
        },
    }
});

export const {
    setEmail,
    setPassword,
    setConfirmPassword
} = forgotPasswordSlice.actions;

export const selectEmail = state => state.forgotPassword.email;
export const selectPassword = state => state.forgotPassword.password;
export const selectConfirmPassword = state => state.forgotPassword.confirmPassword;

export default forgotPasswordSlice.reducer;