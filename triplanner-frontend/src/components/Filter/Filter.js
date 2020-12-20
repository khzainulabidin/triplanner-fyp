import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setFilters, selectFilters} from "../../redux/slices/explore/nearbyPlaces";
import CheckBox from "../CheckBox/CheckBox";

const Filter = ({name}) => {
    const dispatch = useDispatch();
    const filters = useSelector(selectFilters);
    let checked;

    const changeFilter = filterName => {
        dispatch(setFilters(filterName));
        checked = filters.includes(filterName);
    }

    return(
        <CheckBox name={name} onChange={changeFilter} checked={checked} color={'#FBFBFB'}/>
    );
};

export default Filter;