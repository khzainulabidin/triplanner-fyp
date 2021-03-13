import React from "react";
import styles from './Hotel.module.css';

const Hotel = () => {
    return(
        <div>
            <div className={styles.hotelCover}>
                <div className={styles.coverShadow}>
                    <h1>Serena Hotel</h1>
                    <p>A 5 star hotel located in Islamabad, Pakistan</p>
                </div>
            </div>
        </div>
    );
}

export default Hotel;