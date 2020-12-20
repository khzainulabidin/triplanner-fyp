import React from "react";
import styles from './JumboImage.module.css';
import Zoom from "react-reveal/Zoom";

const JumboImage = ({image}) => {
    /*const [index, setIndex] = useState(0);

    const clickNext = () => {
        if (index+1 < images.length){
            setIndex(index+1);
        }
    }

    const clickPrev = () => {
        if (index-1 >= 0){
            setIndex(index-1);
        }
    }*/

    return(
        <div className={styles.jumboImage}>
            {/*<button className={styles.jumboImage_prevBtn} onClick={clickPrev}>
                <KeyboardArrowLeftOutlinedIcon/>
            </button>*/}

            <Zoom>
                <img src={image} alt={'Place'}/>
            </Zoom>

           {/* <button className={styles.jumboImage_nextBtn} onClick={clickNext}>
                <KeyboardArrowRightOutlinedIcon/>
            </button>*/}
        </div>
    );
};

export default JumboImage;