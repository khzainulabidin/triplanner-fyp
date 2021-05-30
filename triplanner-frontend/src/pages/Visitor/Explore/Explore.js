import React, {Fragment, useEffect, useState} from "react";
import NavBar from "../../../components/NavBar/NavBar";
import ExploreLanding from "../../../components/ExploreLanding/ExploreLanding";
import ExploreSection from "../../../components/ExploreSection/ExploreSection";
import PlacesSection from "../../../components/PlacesSection/PlacesSection";
import Footer from "../../../components/Footer/Footer";
import start_planning_icon from "../../../assets/start_planning_icon.png";
import book_hotel_icon from '../../../assets/book_hotel_icon.png';
import {getMe} from "../../../utils/auth";
import {useHistory} from "react-router-dom";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const Explore = () => {
    const [isLoading, setIsLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('token')){
            getMe().then(user => {
                if (user.accountType === 'business'){
                    return history.push('/business/dashboard');
                }
                if (user.accountType === 'admin'){
                    return history.push('/admin/dashboard');
                }
            }).catch(() => {
                setIsLoading(false);
            });
        }
        setIsLoading(false);
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            {isLoading ? null : (
                <Fragment>
                    <NavBar/>
                    <ExploreLanding/>
                    <PlacesSection/>
                    <ExploreSection
                        bg
                        type={'right'}
                        imgSrc={start_planning_icon}
                        title={'Ready to explore new'}
                        titleHighlight={'worlds'}
                        description={'Make your life easy by interactively planning your tour, like never before'}
                        btnText={'Start Planning Now'}
                        toRoute={'/planTrip'}
                    />
                    <ExploreSection
                        imgSrc={book_hotel_icon}
                        title={'Going for a short'}
                        titleHighlight={'trip'}
                        description={'Book hotel rooms based on your interests, not in a traditional way'}
                        btnText={'Book a room'}
                        toRoute={'/bookRoom'}
                    />
                    <Footer/>
                </Fragment>
            )}
        </Fragment>
    );
}

export default Explore;
