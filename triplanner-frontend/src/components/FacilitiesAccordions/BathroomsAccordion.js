import style from './FacilitiesAccordions.module.css';
import FacilitiesBox from "../FacilitiesBox/FacilitiesBox";
import React from "react";

const BathroomAccordion = ({facilities, setFacilities}) => {
    return(
        <div className={style.facilitiesContainer}>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'toilet paper'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'bath tub'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'hair dryer'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'shower'}/>
        </div>
    );
}

export default BathroomAccordion;