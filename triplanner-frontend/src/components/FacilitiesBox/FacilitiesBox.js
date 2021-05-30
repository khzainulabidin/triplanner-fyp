import React from "react";
import {Switch} from "@material-ui/core";

const FacilitiesBox = ({facility, facilities, setFacilities}) => {

    const addFacility = facility => {
        if (facilities.includes(facility.toLowerCase())){
            setFacilities(facilities.filter(item => item.toLowerCase() !== facility.toLowerCase()));
        }
        else {
            setFacilities([...facilities, facility.toLowerCase()]);
        }
    }

    return(
        <span>
            <Switch checked={facilities.includes(facility.toLowerCase())} onChange={e => addFacility(e.target.name)} name={facility} label={facility}/>
            <span style={{textTransform: 'capitalize', fontSize: '90%'}}>{facility}</span>
        </span>
    );
}

export default FacilitiesBox;
