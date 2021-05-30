import style from './FacilitiesAccordions.module.css';
import FacilitiesBox from "../FacilitiesBox/FacilitiesBox";
import React from "react";

const FoodAccordion = ({facilities, setFacilities}) => {
    return(
        <div className={style.facilitiesContainer}>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'dining area'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'barbecue'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'toaster'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'electric kettle'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'microwave'}/>
            <FacilitiesBox facilities={facilities} setFacilities={setFacilities} facility={'refrigerator'}/>
        </div>
    );
}

export default FoodAccordion;