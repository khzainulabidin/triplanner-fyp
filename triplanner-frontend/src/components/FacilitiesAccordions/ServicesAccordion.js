import style from './FacilitiesAccordions.module.css';
import FacilitiesBox from "../FacilitiesBox/FacilitiesBox";
import React from "react";

const ServicesAccordion = ({facilities, setFacilities}) => {
    return(
        <div className={style.facilitiesContainer}>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'alarm clock'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'towels'}/>
        </div>
    );
}

export default ServicesAccordion;