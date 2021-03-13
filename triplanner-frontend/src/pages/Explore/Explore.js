import React, {useEffect} from "react";
import Fade from 'react-reveal/Fade';
import NavBar from "../../components/NavBar/NavBar";
import ExploreLanding from "../../components/ExploreLanding/ExploreLanding";
import ExploreSection from "../../components/ExploreSection/ExploreSection";
import PlacesSection from "../../components/PlacesSection/PlacesSection";
import Footer from "../../components/Footer/Footer";
import {selectUser, selectIsLoggedIn} from "../../redux/slices/user/user";
import {useSelector} from "react-redux";
import {useHistory} from "react-router";
import start_planning_icon from "../../assets/start_planning_icon.png";
import book_hotel_icon from '../../assets/book_hotel_icon.png';

const Explore = () => {
    const user = useSelector(selectUser);
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const history = useHistory();

    return(
        <Fade>
            <NavBar/>
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
                btnClick={()=>{}}
            />
            <ExploreSection
                imgSrc={book_hotel_icon}
                title={'Going for a short'}
                titleHighlight={'trip'}
                description={'Book hotel rooms based on your interests, not in a traditional way'}
                btnText={'Book a room'}
                btnClick={() => history.push('/bookRoom')}
            />
            <Footer/>
        </Fade>
    );
};

export default Explore;