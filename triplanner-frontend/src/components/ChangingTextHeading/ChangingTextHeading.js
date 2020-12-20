import React from "react";
import styles from "../ExploreLanding/ExploreLanding.module.css";
import TextLoop from "react-text-loop";

const ChangingTextHeading = ({simpleText, changingTexts}) => (
    <h1 className={styles.exploreLanding_landingTitle}>
        {simpleText} <span className={'colored-text'}>
            <TextLoop>
                {changingTexts.map((text, index) => <span key={index}>{text}</span>)}
            </TextLoop>
        </span>
    </h1>
);

export default ChangingTextHeading;