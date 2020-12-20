import React from "react";
import Filter from "../Filter/Filter";
import styles from "../NearbyPlaces/NearbyPlaces.module.css";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import {Slider} from "@material-ui/core";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";

const PlacesFilters = () => (
    <React.Fragment>
            <div className={styles.nearbyPlaces_ratingFilter}>
                    <FavoriteBorderOutlinedIcon/>
                    <Slider value={4} min={1} max={5} onChange={()=>{}} className={styles.nearbyPlaces_ratingSlider} />
                    <FavoriteOutlinedIcon/>
            </div>
            <Filter name={'Restaurants'}/>
            <Filter name={'Parks'}/>
            <Filter name={'Hotels'}/>
            <Filter name={'Shopping'}/>
            <Filter name={'Transit'}/>
            <Filter name={'Monuments'}/>
            <Filter name={'Hospitals & Pharmacies'}/>
            <Filter name={'ATMs & Banks'}/>
            <Filter name={'Places of Worship'}/>
    </React.Fragment>
);

export default PlacesFilters;