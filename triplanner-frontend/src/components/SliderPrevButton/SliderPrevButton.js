import React from "react";
import SliderButton from "../SliderButton/SliderButton";

const SliderPrevButton = ({startingIndex, endingIndex, setStartingIndex, setEndingIndex, count}) => {

    const clickPrev = () => {
        if (startingIndex-count >= 0){
            setStartingIndex(startingIndex-count);
            setEndingIndex(endingIndex-count);
        }
    }

    return(
        <SliderButton type={'prev'} onClick={clickPrev} disabled={startingIndex === 0}/>
    );
};

export default SliderPrevButton;