import React from 'react';
import Explore from "../../pages/Visitor/Explore/Explore";
import {MuiThemeProvider} from "@material-ui/core";
import {theme} from "../Theme/theme";
import styles from './App.module.css';
import 'react-calendar/dist/Calendar.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PlaceDetail from "../../pages/Visitor/PlaceDetail/PlaceDetail";
import AllPlaces from "../../pages/Visitor/AllPlaces/AllPlaces";
import CreateProfile from "../../pages/HotelAccount/CreateProfile/CreateProfile";
import Dashboard from "../../pages/HotelAccount/Dashboard/Dashboard";
import Profile from "../../pages/HotelAccount/Profile/Profile";
import Rooms from "../../pages/HotelAccount/Rooms/Rooms";
import Facilities from "../../pages/HotelAccount/Facilities/Facilities";
import Messages from "../../pages/HotelAccount/Messages/Messages";
import SignIn from "../../pages/Account/SignIn/SignIn";
import CreateAccountBasic from "../../pages/Account/CreateAccountBasic/CreateAccountBasic";
import CreateAccountInfo from "../../pages/Account/CreateAccountInfo/CreateAccountInfo";
import CreateAccountInterests from "../../pages/TouristAccount/CreateAccountInterests/CreateAccountInterests";
import ForgotPassword from "../../pages/Account/ForgotPassword/ForgotPassword";
import ResetPassword from "../../pages/Account/ResetPassword/ResetPassword";
import VerifyEmail from "../../pages/Account/VerifyEmail/VerifyEmail";
import ProtectedRoute from "./ProtectedRoute";
import PageNotFound from "../../pages/PageNotFound/PageNotFound";
import TouristCreateProfile from "../../pages/TouristAccount/TouristCreateProfile/TouristCreateProfile";
import BookRoom from "../../pages/Visitor/BookRoom/BookRoom";
import RoomResults from "../../pages/Visitor/BookRoom/RoomResults/RoomResults";
import AvailableRooms from "../../pages/Visitor/BookRoom/AvailableRooms/AvailableRooms";
import BookingPayment from "../../pages/TouristAccount/BookingPayment/BookingPayment";
import Bookings from "../../pages/HotelAccount/Bookings/Bookings";
import Gallery from "../../pages/HotelAccount/Gallery/Gallery";
import TouristDashboard from "../../pages/TouristAccount/TouristDashboard/TouristDashboard";
import TouristProfile from "../../pages/TouristAccount/TouristProfile/TouristProfile";
import TouristBookings from "../../pages/TouristAccount/TouristBookings/TouristBookings";
import TouristReviews from "../../pages/TouristAccount/TouristReviews/TouristReviews";
import TouristMessages from "../../pages/TouristAccount/TouristMessages/TouristMessages";
import TouristTrips from "../../pages/TouristAccount/TouristTrips/TouristTrips";
import PlanTrip from "../../pages/TouristAccount/PlanTrip/PlanTrip";
import TripPlan from "../../pages/TouristAccount/TouristTrips/TripPlan/TripPlan";
import CommonPoint from "../../pages/TouristAccount/CommonPoint/CommonPoint";
import TouristFriends from "../../pages/TouristAccount/TouristFriends/TouristFriends";
import AdminDashboard from "../../pages/AdminAccount/AdminDashboard/AdminDashboard";
import AdminUsers from "../../pages/AdminAccount/AdminUsers/AdminUsers";
import AdminBookings from "../../pages/AdminAccount/AdminBookings/AdminBookings";
import AdminTrips from "../../pages/AdminAccount/AdminTrips/AdminTrips";
import DiscussionGroup from "../../pages/TouristAccount/DiscussionGroup/DiscussionGroup";

const App = () => {
    return(
        <Router>
            <MuiThemeProvider theme={theme}>
                <div className={styles.app}>
                    <Switch>
                        <Route path={'/'} exact component={Explore}/>
                        <Route path={'/placeDetail/:placeId'} exact component={PlaceDetail}/>
                        <Route path={'/allPlaces'} exact component={AllPlaces}/>
                        <Route path={'/bookRoom'} exact component={BookRoom}/>
                        <Route path={'/roomSearchResults/:destination/:checkIn/:checkOut'} exact component={RoomResults}/>
                        <Route path={'/availableRooms/:checkIn/:checkOut/:hotelId'} exact component={AvailableRooms}/>

                        <Route path={'/account/createAccountBasic'} exact component={CreateAccountBasic}/>
                        <Route path={'/account/signIn'} exact component={SignIn}/>
                        <Route path={'/account/forgotPassword'} exact component={ForgotPassword}/>
                        <Route path={'/account/resetPassword'} exact component={ResetPassword}/>
                        <Route path={'/account/verifyEmail/:iv/:content/:token'} exact component={VerifyEmail}/>

                        <ProtectedRoute path={'/business/createProfile'} exact component={CreateProfile} type={'business'}/>
                        <ProtectedRoute path={'/business/dashboard'} exact component={Dashboard} type={'business'}/>
                        <ProtectedRoute path={'/business/profile'} exact component={Profile} type={'business'}/>
                        <ProtectedRoute path={'/business/bookings'} exact component={Bookings} type={'business'}/>
                        <ProtectedRoute path={'/business/rooms'} exact component={Rooms} type={'business'}/>
                        <ProtectedRoute path={'/business/gallery'} exact component={Gallery} type={'business'}/>
                        <ProtectedRoute path={'/business/facilities'} exact component={Facilities} type={'business'}/>
                        <ProtectedRoute path={'/business/messages'} exact component={Messages} type={'business'}/>

                        <ProtectedRoute path={'/account/createAccountInfo'} exact component={CreateAccountInfo} type={'any'}/>

                        <ProtectedRoute path={'/createProfile'} exact component={TouristCreateProfile} type={'tourist'}/>
                        <ProtectedRoute path={'/createProfile/:edit'} exact component={TouristCreateProfile} type={'tourist'}/>
                        <ProtectedRoute path={'/account/interests'} exact component={CreateAccountInterests} type={'tourist'}/>
                        <ProtectedRoute path={'/bookingPayment/:type/:checkIn/:checkOut/:hotelId'} exact component={BookingPayment} type={'tourist'}/>
                        <ProtectedRoute path={'/dashboard'} exact component={TouristDashboard} type={'tourist'}/>
                        <ProtectedRoute path={'/profile/:username'} exact component={TouristProfile} type={'tourist'}/>
                        <ProtectedRoute path={'/profile'} exact component={TouristProfile} type={'tourist'}/>
                        <ProtectedRoute path={'/bookings'} exact component={TouristBookings} type={'tourist'}/>
                        <ProtectedRoute path={'/reviews'} exact component={TouristReviews} type={'tourist'}/>
                        <ProtectedRoute path={'/messages'} exact component={TouristMessages} type={'tourist'}/>
                        <ProtectedRoute path={'/trips'} exact component={TouristTrips} type={'tourist'}/>
                        <ProtectedRoute path={'/friends'} exact component={TouristFriends} type={'tourist'}/>
                        <ProtectedRoute path={'/tripPlan/:tripId'} exact component={TripPlan} type={'tourist'}/>
                        <ProtectedRoute path={'/planTrip'} exact component={PlanTrip} type={'tourist'}/>
                        <ProtectedRoute path={'/commonPoint'} exact component={CommonPoint} type={'tourist'}/>
                        <ProtectedRoute path={'/discussionGroup/:destinationId/:departureTime'} exact component={DiscussionGroup} type={'tourist'}/>

                        <ProtectedRoute path={'/admin/dashboard'} exact component={AdminDashboard} type={'admin'}/>
                        <ProtectedRoute path={'/admin/users'} exact component={AdminUsers} type={'admin'}/>
                        <ProtectedRoute path={'/admin/bookings'} exact component={AdminBookings} type={'admin'}/>
                        <ProtectedRoute path={'/admin/trips'} exact component={AdminTrips} type={'admin'}/>

                        <Route path={'*'} component={PageNotFound}/>
                    </Switch>
                </div>
            </MuiThemeProvider>
        </Router>
    );
}

export default App;
