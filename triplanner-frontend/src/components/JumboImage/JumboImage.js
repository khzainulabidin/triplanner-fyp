import React from "react";
import styles from './JumboImage.module.css';
import Zoom from "react-reveal/Zoom";

const JumboImage = ({image}) => {

    return(
        <div className={styles.jumboImage}>
            <Zoom>
                <img src={image} alt={'Place'}/>
            </Zoom>
        </div>
    );
};

export default JumboImage;