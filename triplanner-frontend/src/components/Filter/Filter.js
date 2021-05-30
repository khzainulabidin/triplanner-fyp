import React, {useContext} from "react";
import CheckBox from "../CheckBox/CheckBox";
import {FiltersContext} from "../NearbyPlaces/NearbyPlaces";

const Filter = ({name}) => {
    const {filters, setFilters} = useContext(FiltersContext);

    const isChecked = () => {
        return filters.includes(name.toLowerCase().replace(' ', '_'));
    }

    const changeFilter = () => {
        if (isChecked()){
            return setFilters(filters.filter(filter => filter !== name.toLowerCase().replace(' ', '_')));
        }
        return setFilters([...filters, name.toLowerCase().replace(' ', '_')]);
    }

    return(
        <CheckBox name={name} onChange={changeFilter} checked={isChecked()} color={'#FBFBFB'}/>
    );
};

export default Filter;