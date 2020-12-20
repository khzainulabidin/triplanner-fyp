import React from "react";
import SliderButton from "../SliderButton/SliderButton";

const SliderNextButton = ({startingIndex, setStartingIndex, endingIndex, setEndingIndex, count, length}) => {

    const clickNext = () => {
        if (endingIndex <= length){
            setStartingIndex(startingIndex+count);
            setEndingIndex(endingIndex+count);
        }
    }

    return(
        <SliderButton type={'next'} onClick={clickNext} disabled={endingIndex === length}/>
    );
};

export default SliderNextButton;