import React, {useState} from "react";
import styles from './Reviews.module.css';
import {FormControl, MenuItem, Select} from "@material-ui/core";
import ReviewsBox from "../ReviewsBox/ReviewsBox";
import ReviewsBoxOptions from "../ReviewsBox/ReviewsBoxOptions";
import RecommendationBox from "../RecommendationBox/RecommendationBox";
import QuestionsBox from "../QuestionsBox/QuestionsBox";
import QuestionsBoxOptions from "../QuestionsBox/QuestionsBoxOptions";

const Reviews = ({bg}) => {
    const [mode, setMode] = useState('reviews');
    let box;

    switch (mode){
        case 'reviews':
            box = <ReviewsBox/>;
            break;
        case 'recommendation':
            box = <RecommendationBox recommendation={8.9}/>;
            break;
        case 'questions':
            box = <QuestionsBox/>;
            break;
        default:
            box = null;
    }

    return(
        <div className={styles.reviews} style={{backgroundImage: `url(${bg})`}}>
            <div className={styles.reviews_container}>
                <div className={styles.reviews_header}>
                    <FormControl>
                        <Select value={mode} onChange={e => setMode(e.target.value)}>
                            <MenuItem value={'reviews'}>Reviews</MenuItem>
                            <MenuItem value={'recommendation'}>Recommendation</MenuItem>
                            <MenuItem value={'questions'}>Questions</MenuItem>
                        </Select>
                    </FormControl>

                    {mode === 'reviews' ? <ReviewsBoxOptions/> : null}
                    {mode === 'questions' ? <QuestionsBoxOptions/> : null}
                </div>

                {box}
            </div>
        </div>
    );
};

export default Reviews;