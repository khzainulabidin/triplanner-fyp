import React from "react";
import {Checkbox} from "@material-ui/core";

const CheckBox = ({name, onChange, checked, color}) => {
    const changeHandler = e => {
        onChange(e.target.name);
    };

    return(
        <div>
            <Checkbox checked={checked} onChange={changeHandler} name={name.toLowerCase()} style={{color: color}}/>
            {name}
        </div>
    );
};

export default CheckBox;