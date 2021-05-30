import React from "react";
import styles from './ExploreSection.module.css';
import Title from "../Title/Title";
import {useHistory} from "react-router-dom";

const ExploreSection = ({bg, type, imgSrc, title, titleHighlight, description, btnText, toRoute}) => {
    const img = (
        <div>
            <img className={styles.exploreSection_img} src={imgSrc} alt={'Icon'}/>
        </div>
    );
    const history = useHistory();
    const handleClick = () => {
        history.push(toRoute);
    }
    const details = <Title title={title} titleHighlight={titleHighlight} description={description} btnText={btnText} btnClick={handleClick}/>;

    return(
        <div
            className={styles.exploreSection}
            style={{backgroundColor: bg ? '#F0F2F5' : '#FFFFFF'}}>
            {type === 'right' ? img : details}
            {type === 'right' ? details : img}
        </div>
    );
}

export default ExploreSection;