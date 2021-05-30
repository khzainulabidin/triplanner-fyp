import {Fragment} from "react";
import NavLink from "../NavLink/NavLink";
import HomeIcon from "@material-ui/icons/Home";
import PersonIcon from "@material-ui/icons/Person";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import PoolIcon from "@material-ui/icons/Pool";
import ChatIcon from "@material-ui/icons/Chat";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import MyLayout from "../MyLayout/MyLayout";

const BusinessLayout = ({isLoading, children}) => {
    return(
        <MyLayout
            isLoading={isLoading}
            logoTag={' | Business'}
            homeUrl={'/business/dashboard'}
            menu={
                <Fragment>
                    <NavLink route={'/business/dashboard'}><HomeIcon className={'menuIcon'}/> Home</NavLink>
                    <NavLink route={'/business/profile'}><PersonIcon className={'menuIcon'}/> Profile</NavLink>
                    <NavLink route={'/business/bookings'}><AssignmentTurnedInIcon className={'menuIcon'}/> Bookings</NavLink>
                    <NavLink route={'/business/messages'}><ChatIcon className={'menuIcon'}/> Messages</NavLink>
                    <NavLink route={'/business/rooms'}><MeetingRoomIcon className={'menuIcon'}/> Rooms</NavLink>
                    <NavLink route={'/business/gallery'}><PhotoLibraryIcon className={'menuIcon'}/> Gallery</NavLink>
                    <NavLink route={'/business/facilities'}><PoolIcon className={'menuIcon'}/> Facilities</NavLink>
                </Fragment>
            }>
            {children}
        </MyLayout>
    );
}

export default BusinessLayout;
