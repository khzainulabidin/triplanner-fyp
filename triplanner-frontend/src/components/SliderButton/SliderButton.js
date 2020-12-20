import React from "react";
import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";

const SliderButton = ({type, onClick, disabled}) => (
    <button className={'placesSection_sliderBtn'} onClick={onClick} disabled={disabled}>
        {type === 'prev' ? <ChevronLeftOutlinedIcon/> : <ChevronRightOutlinedIcon/>}
    </button>
);

export default SliderButton;