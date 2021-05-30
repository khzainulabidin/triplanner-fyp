import style from './Facilities.module.css';
import BusinessLayout from "../../../components/BusinessLayout/BusinessLayout";
import MyAccordion from "../../../components/MyAccordion/MyAccordion";
import React, {useState, useEffect} from "react";
import FacilitiesAccordion from "../../../components/FacilitiesAccordions/FacilitiesAccordion";
import RoomsAccordion from "../../../components/FacilitiesAccordions/RoomsAccordion";
import BathroomAccordion from "../../../components/FacilitiesAccordions/BathroomsAccordion";
import MediaAccordion from "../../../components/FacilitiesAccordions/MediaAccordion";
import FoodAccordion from "../../../components/FacilitiesAccordions/FoodAccordion";
import ServicesAccordion from "../../../components/FacilitiesAccordions/ServicesAccordion";
import AccessibilityAccordion from "../../../components/FacilitiesAccordions/AccessibilityAccordion";
import ViewAccordion from "../../../components/FacilitiesAccordions/ViewAccordion";
import axios from "axios";
import {BUSINESS_FACILITIES} from "../../../utils/routes";
import {getMe} from "../../../utils/auth";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import {Fade} from "react-reveal";

const Facilities = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [facilities, setFacilities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getMe().then(user => {
            setIsLoading(false);
            setUser(user);
            if (user.facilities){
                setFacilities(user.facilities);
            }
        }).catch(() => {
            setIsLoading(false);
            setUser(null);
        });
        //eslint-disable-next-line
    }, []);

    const saveFacilities = () => {
        setIsLoading(true);
        axios.put(BUSINESS_FACILITIES, {facilities}, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }}).then(res => {
            setIsLoading(false);
            const data = res.data;
            if (!data.success){
                return setError(data.data);
            }
            setError('');
        }).catch(() => {
            setIsLoading(false);
            setError('Cannot update facilities');
        })
    }

    return(
        <BusinessLayout isLoading={isLoading}>
            {isLoading ? null : user ? (
                <div className={style.facilities}>
                    <Fade>
                        {error && <p className={style.error}>{error}</p>}
                        <MyAccordion
                            heading={'Facilities'}
                            content={<FacilitiesAccordion facilities={facilities} setFacilities={setFacilities}/>}
                        />
                        <MyAccordion
                            heading={'Rooms'}
                            content={<RoomsAccordion facilities={facilities} setFacilities={setFacilities}/>}
                        />
                        <MyAccordion
                            heading={'Bathrooms'}
                            content={<BathroomAccordion facilities={facilities} setFacilities={setFacilities}/>}
                        />
                        <MyAccordion
                            heading={'Media'}
                            content={<MediaAccordion facilities={facilities} setFacilities={setFacilities}/>}
                        />
                        <MyAccordion
                            heading={'Food'}
                            content={<FoodAccordion facilities={facilities} setFacilities={setFacilities}/>}
                        />
                        <MyAccordion
                            heading={'Services'}
                            content={<ServicesAccordion facilities={facilities} setFacilities={setFacilities}/>}
                        />
                        <MyAccordion
                            heading={'Accessibility'}
                            content={<AccessibilityAccordion facilities={facilities} setFacilities={setFacilities}/>}
                        />
                        <MyAccordion
                            heading={'Views'}
                            content={<ViewAccordion facilities={facilities} setFacilities={setFacilities}/>}
                        />

                        <button type={'button'} onClick={saveFacilities}>Save</button>
                    </Fade>
                </div>) : <div className={'noUserContainer'}><NoUserWindow/></div>}
        </BusinessLayout>
    );
}

export default Facilities;
