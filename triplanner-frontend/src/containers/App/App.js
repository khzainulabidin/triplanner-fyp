import React from 'react';
import Account from "../../pages/Account/Account";
import Explore from "../../pages/Explore/Explore";
import {MuiThemeProvider} from "@material-ui/core";
import {theme} from "../Theme/theme";
import styles from './App.module.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PlaceDetail from "../../pages/PlaceDetail/PlaceDetail";
import AllPlaces from "../../pages/AllPlaces/AllPlaces";
import HotelInfo from "../../pages/HotelAccount/HotelInfo/HotelInfo";
import RoomsInfo from "../../pages/HotelAccount/RoomsInfo/RoomsInfo";
import HotelFacilities from "../../pages/HotelAccount/HotelFacilities/HotelFacilities";
import Hotel from "../../pages/HotelAccount/Hotel/Hotel";
import BookRoom from "../../pages/BookRoom/BookRoom";

const App = () => (
    <Router>
        <MuiThemeProvider theme={theme}>
            <div className={styles.app}>
                <Switch>
                    <Route path={'/'} exact>
                        <Explore/>
                    </Route>
                    <Route path={'/account'} exact>
                        <Account/>
                    </Route>
                    <Route path={'/placeDetail'} exact>
                        <PlaceDetail/>
                    </Route>
                    <Route path={'/allPlaces'} exact>
                        <AllPlaces/>
                    </Route>
                    <Route path={'/hotelInfo'} exact>
                        <HotelInfo/>
                    </Route>
                    <Route path={'/roomsInfo'} exact>
                        <RoomsInfo/>
                    </Route>
                    <Route path={'/hotelFacilities'} exact>
                        <HotelFacilities/>
                    </Route>
                    <Route path={'/business'} exact>
                        <Hotel/>
                    </Route>
                    <Route path={'/bookRoom'} exact>
                        <BookRoom/>
                    </Route>
                </Switch>
            </div>
        </MuiThemeProvider>
    </Router>
)

export default App;