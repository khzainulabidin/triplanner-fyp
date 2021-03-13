import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";

const FacilitiesBox = ({facility, checkFacility, addFacility}) => {
    return(
        <FormControlLabel
            control={
                <Checkbox
                    checked={checkFacility(facility)}
                    onChange={() => addFacility(facility)}
                    name={facility}
                    color="primary"
                />
            }
            label={<span style={{fontSize: '1rem', textTransform: 'capitalize'}}>{facility}</span>}
        />
    );
};

export default FacilitiesBox;