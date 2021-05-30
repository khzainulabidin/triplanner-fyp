import style from './FacilitiesAccordions.module.css';
import FacilitiesBox from "../FacilitiesBox/FacilitiesBox";
import React from "react";

const RoomsAccordion = ({facilities, setFacilities}) => {
    return(
        <div className={style.facilitiesContainer}>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'sofa bed'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'wardrobe'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'carpeted'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'fireplace'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'heating'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'iron'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'private entrance'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'sound proof'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'sitting area'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'wooden flooring'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'desk'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'room service'}/>
        </div>
    );
}

export default RoomsAccordion;