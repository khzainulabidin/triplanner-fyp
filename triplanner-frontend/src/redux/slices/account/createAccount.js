import {createSlice} from "@reduxjs/toolkit";

const createAccountSlice = createSlice({
    name: 'createAccount',

    initialState: {
        email: '',
        password: '',
        username: '',
        name: '',
        accType: 'tourist',
        interests: [],
        signUpProgress: 0,
    },

    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },

        setPassword: (state, action) => {
            state.password = action.payload;
        },

        setUsername: (state, action) => {
            state.username = action.payload;
        },

        setName: (state, action) => {
            state.name = action.payload;
        },

        setAccType: (state, action) => {
            state.accType = action.payload;
        },

        incrementSignUpProcess: state => {
            state.signUpProgress += 50;
        },

        decrementSignUpProcess: state => {
            state.signUpProgress -= 50;
        },

        addInterest: (state, action) => {
            state.interests = [...state.interests, action.payload];
            state.interest = '';
        },

        removeInterest: (state, action) => {
            state.interests = state.interests.filter(interest => interest !== action.payload);
        },
    }
});

export const {
    setEmail,
    setPassword,
    setUsername,
    setName,
    setAccType,
    addInterest,
    removeInterest,
    incrementSignUpProcess,
    decrementSignUpProcess,
} = createAccountSlice.actions;

export const selectEmail = state => state.createAccount.email;
export const selectPassword = state => state.createAccount.password;
export const selectUsername = state => state.createAccount.username;
export const selectName = state => state.createAccount.name;
export const selectAccType = state => state.createAccount.accType;
export const selectInterests = state => state.createAccount.interests;
export const selectSignUpProgress = state => state.createAccount.signUpProgress;

export default createAccountSlice.reducer;