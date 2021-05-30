import axios from "axios";
import imageCompression from 'browser-image-compression';
import {
    NEARBY_PLACES_PROXY,
    PLACE_PHOTO,
    RATING_ROUTE,
    UPDATE_FRIEND,
    UPLOAD_PHOTO_ROUTE
} from "./routes";
import {getMe} from "./auth";
import placeholder from "../assets/placeholder.png";
import {isValidInterest} from "./regex";

export const getSrc = (photo, clickable) => {
    if (clickable && photo){
        return URL.createObjectURL(photo);
    }
    else if (!clickable && photo){
        return photo;
    }
    return null;
}


export const handlePhotoClick = (clickable, ref) => {
    if (clickable){
        ref.current.click();
    }
}

export const uploadSingleFile = async (file, type) => {
    try {
        const compressedFile = await imageCompression(file, {
            maxSizeMB: 0.1,
            useWebWorker: true
        });
        const formData = new FormData();
        formData.append('file', compressedFile);
        formData.append('type', type);
        const res = await axios.post(UPLOAD_PHOTO_ROUTE, formData, {headers: {
            'x-access-token': localStorage.getItem('token')
        }});
        return res.data.success;
    }
    catch (e){
        return false;
    }
}

export const getPlaces = async (setInterests, interests, setNearbyPlaces, setError, filters=[], setLocation, setFilteredPlaces, placeLocation) => {
    let localInterests = [];
    if (localStorage.getItem('token')){
        const user = await getMe();
        if (user.interests){
            setInterests(user.interests);
            localInterests = user.interests;
        }
    }

    if (placeLocation && setLocation){
        setLocation(placeLocation);
        fetchPlacesFromServer(localInterests, placeLocation, setNearbyPlaces, setError, filters, setFilteredPlaces);
    }
    else if (sessionStorage.getItem('location') !== undefined && sessionStorage.getItem('location') !== null && sessionStorage.getItem('location') !== ''){
        const storageLocation = sessionStorage.getItem('location').split('|');

        if (setLocation) {
            setLocation({
                lat: Number(storageLocation[0]),
                lng: Number(storageLocation[1])
            });
        }

        const finalPosition = {lat: Number(storageLocation[0]), lng: Number(storageLocation[1])};
        fetchPlacesFromServer(localInterests, finalPosition, setNearbyPlaces, setError, filters, setFilteredPlaces);
    }
    else {
        const locationFromAPI = await axios.get(process.env.REACT_APP_IPGEOLOCATION_BASE_URL);
        const data = locationFromAPI.data;
        sessionStorage.setItem('location', `${data.latitude}|${data.longitude}`);

        if (setLocation) {
            setLocation({
                lat: data.latitude,
                lng: data.longitude
            });
        }

        const finalPosition = {lat: data.latitude, lng: data.longitude};
        fetchPlacesFromServer(localInterests, finalPosition, setNearbyPlaces, setError, filters, setFilteredPlaces);
    }

}

const fetchPlacesFromServer = (interests, position, setNearbyPlaces, setError, filters, setFilteredPlaces) => {
    const basicKeywords = ['river','beach','mountain','park','museum'];
    const keyword = interests.length > 0 ? interests.join('|') : basicKeywords.join('|');

    axios.post(NEARBY_PLACES_PROXY, {
        latitude: position.lat,
        longitude: position.lng,
        radius: 15000,
        keyword: keyword,
        filters: filters
    }).then(res => {
        const data = res.data;
        if (!data.success){
            return setError(data.data);
        }
        setError('');
        setNearbyPlaces(data.data);

        if (setFilteredPlaces){
            setFilteredPlaces(data.data)
        }
    }).catch(() => {
        setError('Cannot connect to the server');
    });
}

export const getPlacePhoto = async (setPhoto, reference) => {
    setPhoto(placeholder);
    axios.post(PLACE_PHOTO, {reference}).then(res => {
        const data = res.data;
        if (!data.success){
            setPhoto(placeholder);
        }

        const base64 = btoa(new Uint8Array(data.data.data).reduce((data, byte) => data+String.fromCharCode(byte), ''));
        setPhoto("data:;base64," + base64);
    }).catch(() => {
        setPhoto(placeholder);
    });
}

export const openPlaceDetail = (place_id) => {
    window.location = `/placeDetail/${place_id}`;
}

export const getRating = async id => {
    try {
        const res  = await axios.get(`${RATING_ROUTE}/${id}`);
        const data = res.data;
        return data.data;
    }
    catch (e){
        return 0;
    }
}

export const addInterest = (e, setError, interest, setInterest, interests, setInterests) => {
    if (e.key === 'Enter'){
        e.preventDefault();
        if (interest !== '' && isValidInterest(interest)){
            setError('');
            setInterests([...interests, interest]);
        }
        else {
            setError('Please enter a valid interest');
        }
        setInterest('');
    }
}

export const removeInterest = (input, interests, setInterests) => {
    setInterests(interests.filter(interest => interest !== input))
}

export const bestOption = arr => {
    for (let i=0; i<arr.length; i++){
        if (arr[i].rooms.length > 0){
            arr[i].rooms.sort((a, b) => Number(a.price) > Number(b.price) ? 1 : -1);
        }
    }
    return arr.sort((a, b) => ((Number(a.rooms[0].price) > Number(b.rooms[0].price)) || (a.userRating < b.userRating)) ? 1 : -1);
}

const formatMonth = month => {
    switch (month){
        case 0:
            return 'Jan';
        case 1:
            return 'Feb';
        case 2:
            return 'Mar';
        case 3:
            return 'Apr';
        case 4:
            return 'May';
        case 5:
            return 'Jun';
        case 6:
            return 'Jul';
        case 7:
            return 'Aug';
        case 8:
            return 'Sep';
        case 9:
            return 'Oct';
        case 10:
            return 'Nov';
        case 11:
            return 'Dec';
        default:
            return 'Month';
    }
}

const formatAmPm = hour => {
    return hour > 11 ? 'PM' : 'AM';
}

const formatHour = hour => {
    let formattedHour;

    if (hour === 0){
        formattedHour = 12;
    }
    else if (hour > 0 && hour < 12){
        formattedHour = hour;
    }
    else {
        formattedHour = hour-12;
    }

    return formattedHour < 10 ? `0${formattedHour}` : formattedHour;
}

export const formatDate = timestamp => {
    const date = new Date(timestamp*1);
    const month = formatMonth(date.getMonth());
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `${month} ${day}, ${year} ${formatHour(hours)}:${minutes} ${formatAmPm(hours)}`;
}

export const updateFriend = async (username, status, setIsLoading) => {
    setIsLoading(true);
    const res = await axios.put(UPDATE_FRIEND, {username, status}, {headers: {'x-access-token': localStorage.getItem('token')}});
    const data = res.data;
    setIsLoading(false);
    if (!data.success){
        return;
    }
    window.location.reload();
}
