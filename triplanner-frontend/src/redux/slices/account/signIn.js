import {createSlice} from "@reduxjs/toolkit";

const signInSlice = createSlice({
    name: 'signIn',

    initialState: {
        email: '',
        password: '',
        signInMode: true,
        forgotPasswordMode: false,
    },

    reducers:{
        setEmail: (state, action) => {
            state.email = action.payload;
        },

        setPassword: (state, action) => {
            state.password = action.payload;
        },

        changeAccountMode: state => {
            state.signInMode = !state.signInMode;
        },

        toggleForgotMode: state => {
            state.signInMode = !state.signInMode;
            state.forgotPasswordMode = !state.forgotPasswordMode;
        },
    }
});

export const {
    setEmail,
    setPassword,
    changeAccountMode,
    toggleForgotMode,
} = signInSlice.actions;

export const selectEmail = state => state.signIn.email;
export const selectPassword = state => state.signIn.password;
export const selectSignInMode = state => state.signIn.signInMode;
export const selectForgotMode = state => state.signIn.forgotPasswordMode;

export default signInSlice.reducer;