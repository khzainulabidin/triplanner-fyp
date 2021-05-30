import style from './FacilitiesAccordions.module.css';
import FacilitiesBox from "../FacilitiesBox/FacilitiesBox";
import React from "react";

const AccessibilityAccordion = ({facilities, setFacilities}) => {
    return(
        <div className={style.facilitiesContainer}>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'elevator'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'wheelchair access'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'stairs only'}/>
        </div>
    );
}

export default AccessibilityAccordion;