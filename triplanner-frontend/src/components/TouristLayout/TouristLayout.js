import MyLayout from "../MyLayout/MyLayout";
import {Fragment} from "react";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ExploreIcon from '@material-ui/icons/Explore';
import MapIcon from '@material-ui/icons/Map';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import ChatIcon from "@material-ui/icons/Chat";
import NavLink from "../NavLink/NavLink";
import PeopleIcon from '@material-ui/icons/People';

const TouristLayout = ({isLoading, children}) => {
    return(
        <MyLayout
            isLoading={isLoading}
            homeUrl={'/'}
            menu={
                <Fragment>
                    <NavLink route={'/dashboard'}><HomeIcon className={'menuIcon'}/> Home</NavLink>
                    <NavLink route={'/profile'}><PersonIcon className={'menuIcon'}/> Profile</NavLink>
                    <NavLink route={'/allPlaces'}><ExploreIcon className={'menuIcon'}/> Explore</NavLink>
                    <NavLink route={'/trips'}><MapIcon className={'menuIcon'}/> Trips</NavLink>
                    <NavLink route={'/bookings'}><AssignmentTurnedInIcon className={'menuIcon'}/> Bookings</NavLink>
                    <NavLink route={'/friends'}><PeopleIcon className={'menuIcon'}/> Friends</NavLink>
                    <NavLink route={'/messages'}><ChatIcon className={'menuIcon'}/> Messages</NavLink>
                    <NavLink route={'/reviews'}><StarHalfIcon className={'menuIcon'}/> Reviews</NavLink>
                </Fragment>
            }>
            {children}
        </MyLayout>
    );
}

export default TouristLayout;
