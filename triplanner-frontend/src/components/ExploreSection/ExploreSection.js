import React from "react";
import styles from './ExploreSection.module.css';
import Title from "../Title/Title";

const ExploreSection = ({bg, type, imgSrc, title, titleHighlight, description, btnText}) => {
    const img = (
        <div>
            <img className={styles.exploreSection_img} src={imgSrc} alt={'Icon'}/>
        </div>
    );

    const details = <Title title={title} titleHighlight={titleHighlight} description={description} btnText={btnText}/>;

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