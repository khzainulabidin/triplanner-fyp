import style from './FacilitiesAccordions.module.css';
import FacilitiesBox from "../FacilitiesBox/FacilitiesBox";
import React from "react";

const FacilitiesAccordion = ({facilities, setFacilities}) => {
    return(
        <div className={style.facilitiesContainer}>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'parking'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'breakfast'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'free wifi'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'24 hour front-desk'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'fitness center'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'garden'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'swimming pool'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'air conditioning'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'backup generator'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'family rooms'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'restaurant'}/>
        </div>
    );
}

export default FacilitiesAccordion;
