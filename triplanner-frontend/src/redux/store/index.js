import {configureStore} from "@reduxjs/toolkit";
import signIn from "../slices/account/signIn";
import createAccount from "../slices/account/createAccount";
import forgotPassword from "../slices/account/forgotPassword";
import user from "../slices/user/user";
import nearbyPlaces from "../slices/explore/nearbyPlaces";

const store = configureStore({
    reducer:{
        signIn,
        createAccount,
        forgotPassword,
        user,
        nearbyPlaces
    }
});

export default store;