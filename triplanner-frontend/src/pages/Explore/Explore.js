import React, {useEffect} from "react";
import Fade from 'react-reveal/Fade';

import NavBar from "../../components/NavBar/NavBar";
import ExploreLanding from "../../components/ExploreLanding/ExploreLanding";
import ExploreSection from "../../components/ExploreSection/ExploreSection";
import PlacesSection from "../../components/PlacesSection/PlacesSection";
import Footer from "../../components/Footer/Footer";
import {selectToken, selectUser, setUser, selectIsLoggedIn, setIsLoggedIn} from "../../redux/slices/user/user";
import {useSelector, useDispatch} from "react-redux";

import start_planning_icon from "../../assets/start_planning_icon.png";
import book_hotel_icon from '../../assets/book_hotel_icon.png';
import axios from "axios";

const Explore = () => {
    const token = useSelector(selectToken);
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const dispatch = useDispatch();

    const api = axios.create({
        baseURL: `${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_API_AUTH_ROUTE}/me`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    useEffect(() => {
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
        // eslint-disable-next-line
    }, []);

    return(
        <Fade>
            <NavBar isLoggedIn={isLoggedIn} user={user}/>
            <ExploreLanding/>
            <PlacesSection isLoggedIn={isLoggedIn} user={user}/>
            <ExploreSection
                bg
                type={'right'}
                imgSrc={start_planning_icon}
                title={'Ready to explore new'}
                titleHighlight={'worlds'}
                description={'Make your life easy by interactively planning your tour, like never before'}
                btnText={'Start Planning Now'}
            />
            <ExploreSection
                imgSrc={book_hotel_icon}
                title={'Going for a short'}
                titleHighlight={'trip'}
                description={'Book hotel rooms based on your interests, not in a traditional way'}
                btnText={'Book a room'}
            />
            <Footer/>
        </Fade>
    );
};

export default Explore;