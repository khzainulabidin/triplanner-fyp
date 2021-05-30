import {Fragment} from "react";
import NavLink from "../NavLink/NavLink";
import HomeIcon from "@material-ui/icons/Home";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MyLayout from "../MyLayout/MyLayout";
import PeopleIcon from "@material-ui/icons/People";
import MapIcon from "@material-ui/icons/Map";

const AdminLayout = ({isLoading, children}) => {
    return(
        <MyLayout
            isLoading={isLoading}
            logoTag={' | Admin'}
            homeUrl={'/admin/dashboard'}
            menu={
                <Fragment>
                    <NavLink route={'/admin/dashboard'}><HomeIcon className={'menuIcon'}/> Home</NavLink>
                    <NavLink route={'/admin/users'}><PeopleIcon className={'menuIcon'}/> Users</NavLink>
                    <NavLink route={'/admin/bookings'}><AssignmentTurnedInIcon className={'menuIcon'}/> Bookings</NavLink>
                    <NavLink route={'/admin/trips'}><MapIcon className={'menuIcon'}/> Trips</NavLink>
                </Fragment>
            }>
            {children}
        </MyLayout>
    );
}

export default AdminLayout;
