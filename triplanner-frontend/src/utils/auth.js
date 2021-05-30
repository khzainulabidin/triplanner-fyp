import {isValidEmail, isValidPassword, isValidUsername} from "./regex";
import axios from "axios";
import {
    BOOKINGS_ROUTE,
    DELETE_ACCOUNT_ROUTE,
    GET_OTHER_PROFILE, GET_PROFILE_BY_USERNAME,
    GET_USER_ROUTE,
    PROFILE_ROUTE,
    REGISTER_ROUTE
} from "./routes";
import {uploadSingleFile} from "./misc";

const auth = (email, password, setError, route, inputs, history, setIsLoading, username) => {
    if (email === '' || !isValidEmail(email)){
        return setError('Invalid email address');
    }
    if (username){
        if (username.length < 4 || username.length > 20 || !isValidUsername(username)){
            return setError('Invalid username');
        }
    }
    if (password.length < 8 || password.length > 30 || !isValidPassword(password)){
        return setError('Invalid password');
    }

    setIsLoading(true);
    axios.post(route, inputs).then(res => {
        const data = res.data;
        if (!data.success){
            setIsLoading(false);
            return setError(data.data);
        }
        setError('');
        localStorage.setItem('token', data.data);

        if (route === REGISTER_ROUTE){
            setIsLoading(false);
            return history.push('/account/createAccountInfo');
        }

        getMe().then(user => {
            setIsLoading(false);
            if (!user){
                return setError('Cannot connect to the server');
            }
            if (user.isBanned){
                return setError('You have been banned from using the TriPlanner');
            }
            if (!user.accountType){
                return history.push('/account/createAccountInfo');
            }
            if (user.accountType === 'business' && !user.avatar){
                return history.push('/business/createProfile');
            }
            if (user.accountType === 'business') {
                return history.push('/business/dashboard');
            }
            if (user.accountType === 'tourist' && !user.avatar){
                return history.push('/createProfile');
            }
            if (user.accountType === 'tourist'){
                return history.push('/');
            }
            if (user.accountType === 'admin'){
                return history.push('/admin/dashboard');
            }
        }).catch(() => {
            setIsLoading(false);
            setError('Something went wrong');
        })
    }).catch(() => {
        setIsLoading(false);
        setError('Something went wrong');
    });
}

export const getMe = async () => {
    try {
        const res = await axios.get(PROFILE_ROUTE, {headers: {'x-access-token': localStorage.getItem('token')}});
        const data = res.data;
        if (!data.success){
            return false;
        }
        if (data.data.account === undefined){
            return data.data;
        }

        return {...data.data.user, ...data.data.account};
    }
    catch (e){
        return false;
    }
}

export const getOtherProfile = async id => {
    try {
        const res = await axios.get(`${GET_OTHER_PROFILE}/${id}`);
        const data = res.data;
        if (!data.success || !data.data.user || !data.data.account){
            return false;
        }
        return {...data.data.user, ...data.data.account};
    }
    catch (e){
        return false;
    }
}

export const getUser = async (userId, type) => {
    const res = await axios.get(`${GET_USER_ROUTE}/${type}/${userId}`);
    const data = res.data;
    if (!data.success){
        return false;
    }
    return data.data;
}

export const isAuthenticated = async type => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }

    const user = await getMe();
    if (!user) {
        return false;
    }
    if (user.isBanned){
        sessionStorage.setItem('isBanned', user.isBanned.toString());
    }
    else {
        sessionStorage.setItem('isBanned', false.toString());
    }

    return type === 'any' ? true : user.accountType === type;
}

export const logout = history => {
    localStorage.clear();
    sessionStorage.clear();
    history.push('/');
}

export const deleteAccount = async type => {
    try {
        const res = await axios.post(DELETE_ACCOUNT_ROUTE, {type}, {headers: {'x-access-token': localStorage.getItem('token')}});
        const data = res.data;
        if (!data.success){
            return false;
        }
        return data.success;
    }
    catch (e){
        return false;
    }
}

export const updateProfileOnServer = async (profilePhoto, coverPhoto, setError, setIsLoading, input, history, route, push) => {
    if (profilePhoto === null){
        return setError('Add a profile photo');
    }
    if (coverPhoto === null){
        return setError('Add a cover photo');
    }

    setIsLoading(true);
    const isProfilePhotoUploaded = await uploadSingleFile(profilePhoto, 'avatar');
    const isCoverPhotoUploaded = await uploadSingleFile(coverPhoto, 'cover');
    if (!isProfilePhotoUploaded || !isCoverPhotoUploaded){
        setIsLoading(false);
        return setError('Cannot upload photo');
    }
    axios.put(route, input, {headers: {
            'x-access-token': localStorage.getItem('token')
    }}).then(res => {
        setIsLoading(false);
        const data = res.data;
        if (!data.success){
            return setError(data.data);
        }
        setError('');
        history.push(push);
    }).catch(() => {
        setIsLoading(false);
        setError('Unable to update profile');
    });
}

export const myProfile = (setIsLoading, setUser, setProfilePhoto, setCoverPhoto) => {
    setIsLoading(true);
    getMe().then(user => {
        setIsLoading(false);
        setUser(user);
        setProfilePhoto(`${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`);
        setCoverPhoto(`${process.env.REACT_APP_API_BASE_URL}/${user.cover}`);
    }).catch(() => {
        setIsLoading(false);
        setUser(null);
    });
}

export const otherProfile = async (username, setIsLoading, setUser, setProfilePhoto, setCoverPhoto, setMyFriends, history) => {
    try {
        setIsLoading(true);
        const res = await axios.get(`${GET_PROFILE_BY_USERNAME}/${username}`);
        const data = res.data;
        if (!data.success){
            setIsLoading(false);
            return setUser(null);
        }

        const userRes = await getMe();
        if (!userRes){
            setIsLoading(false);
            return setUser(null);
        }

        if (userRes.username === username){
            setIsLoading(false);
            history.push('/profile');
            window.location.reload();
        }

        const friends = [...userRes.friends, ...userRes.friendRequests];

        const user = {...data.data.user, ...data.data.account};
        setUser(user);
        setProfilePhoto(`${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`);
        setCoverPhoto(`${process.env.REACT_APP_API_BASE_URL}/${user.cover}`);
        setMyFriends(friends);
        setIsLoading(false);
    }
    catch (e){
        setIsLoading(false);
        setUser(null);
    }
}

export const getBookings = async type => {
    const res = await axios.post(BOOKINGS_ROUTE, {type}, {headers: {'x-access-token': localStorage.getItem('token')}});
    const data = res.data;
    if (!data.success){
        return false;
    }
    return data.data;
}

export const getFriends = async () => {
    const user = await getMe();
    if (!user){
        return false;
    }
    const userFriends = user.friends.filter(friend => friend.status === 'Accepted');
    const userFriendRequests = user.friendRequests.filter(friend => friend.status === 'Accepted');
    return [...userFriends, ...userFriendRequests];
}

export default auth;
