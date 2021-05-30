import style from './FacilitiesAccordions.module.css';
import FacilitiesBox from "../FacilitiesBox/FacilitiesBox";
import React from "react";

const MediaAccordion = ({facilities, setFacilities}) => {
    return(
        <div className={style.facilitiesContainer}>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'computer'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'game console'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'laptop'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'flat screen tv'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'telephone'}/>
        </div>
    );
}

export default MediaAccordion;