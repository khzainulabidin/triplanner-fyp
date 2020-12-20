import React from "react";
import styles from "../Reviews/Reviews.module.css";

const RecommendationBox = ({recommendation}) => {
    return(
        <div className={styles.recommendation_box}>
            <h1><span className={styles.recommendation}>{recommendation}</span>/10</h1>
            <p>based on the recommendations received by the visitors</p>
        </div>
    );
};

export default RecommendationBox;