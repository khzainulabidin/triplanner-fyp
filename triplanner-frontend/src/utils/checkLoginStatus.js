import {setIsLoggedIn, setUser} from "../redux/slices/user/user";
import axios from "axios";

const checkLoginStatus = (isLoggedIn, token, user, dispatch) => {

    const api = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_AUTH_ROUTE}/me`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!isLoggedIn){
        if (token && user){
            dispatch(setIsLoggedIn(true));
        }
        else if (token && !user){
            api.get('/').then(res => {
                if (res.data.success){
                    dispatch(setUser(res.data.data));
                    dispatch(setIsLoggedIn(true));
                }
                else {
                    console.log(res.data.error);
                }
            }).catch(err => console.log(err.message));
        }
    }
}

export default checkLoginStatus;