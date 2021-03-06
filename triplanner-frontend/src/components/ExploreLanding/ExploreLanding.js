import React from "react";
import styles from './ExploreLanding.module.css';
import search_icon from '../../assets/search_icon.png';
import JumboForm from "../JumboForm/JumboForm";
import ChangingTextHeading from "../ChangingTextHeading/ChangingTextHeading";
import {Fade} from "react-reveal";

const ExploreLanding = () => {
    const changingTexts = ['surroundings', 'neighborhood', 'town', 'city', 'country'];

    return(
        <Fade>
            <div className={styles.exploreLanding}>
                <div className={styles.exploreLanding_container}>
                    <ChangingTextHeading
                        simpleText={'Explore your'}
                        changingTexts={changingTexts}
                    />
                    <JumboForm
                        placeholder={'Search for places'}
                        btnContent={<img src={search_icon} alt={'Search'}/>}
                    />
                </div>
            </div>
        </Fade>
    );
}

export default ExploreLanding;