import React from "react";
import ChevronLeftOutlinedIcon from "@material-ui/icons/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";
import styles from './SliderButton.module.css';

const SliderButton = ({type, onClick, disabled}) => (
    <button className={styles.placesSectionSliderBtn} onClick={onClick} disabled={disabled}>
        {type === 'prev' ? <ChevronLeftOutlinedIcon/> : <ChevronRightOutlinedIcon/>}
    </button>
);

export default SliderButton;
