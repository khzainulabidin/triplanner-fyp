import style from './FacilitiesAccordions.module.css';
import FacilitiesBox from "../FacilitiesBox/FacilitiesBox";
import React from "react";

const ViewAccordion = ({facilities, setFacilities}) => {
    return(
        <div className={style.facilitiesContainer}>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'city view'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'garden view'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'lake view'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'landmark view'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'mountain view'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'pool view'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'river view'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'ocean view'}/>
        </div>
    );
}

export default ViewAccordion;