import React from "react";
import {useSelector} from "react-redux";
import {selectSignUpProgress} from "../../redux/slices/account/createAccount";
import {selectSignInMode, selectForgotMode} from "../../redux/slices/account/signIn";

import SignInBox from "../../components/AccountBox/SignInBox/SignInBox";
import CreateAccountBasicBox from "../../components/AccountBox/CreateAccountBasicBox/CreateAccountBasicBox";
import CreateAccountInfoBox from "../../components/AccountBox/CreateAccountInfoBox/CreateAccountInfoBox";
import CreateAccountInterestsBox from "../../components/AccountBox/CreateAccountInterestsBox/CreateAccountInterestsBox";
import ForgotPasswordBox from "../../components/AccountBox/ForgotPasswordBox/ForgotPasswordBox";

const Account = () => {
    const signInMode = useSelector(selectSignInMode);
    const forgotMode = useSelector(selectForgotMode);
    const signUpProgress = useSelector(selectSignUpProgress);

    let screen;

    if (signInMode){
        screen = <SignInBox/>;
    }
    else if (!signInMode && forgotMode){
        screen = <ForgotPasswordBox/>
    }
    else if (!signInMode && !forgotMode && signUpProgress === 0){
        screen = <CreateAccountBasicBox/>;
    }
    else if (!signInMode && !forgotMode && signUpProgress === 50) {
        screen = <CreateAccountInfoBox/>
    }
    else if (!signInMode && !forgotMode && signUpProgress === 100){
        screen = <CreateAccountInterestsBox/>;
    }

    return(
        screen
    );
}

export default Account;