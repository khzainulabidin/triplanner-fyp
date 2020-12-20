import React from 'react';
import Account from "../../pages/Account/Account";
import Explore from "../../pages/Explore/Explore";
import {MuiThemeProvider} from "@material-ui/core";
import {theme} from "../Theme/theme";
import styles from './App.module.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PlaceDetail from "../../pages/PlaceDetail/PlaceDetail";
import AllPlaces from "../../pages/AllPlaces/AllPlaces";

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
                </Switch>
            </div>
        </MuiThemeProvider>
    </Router>
)

export default App;