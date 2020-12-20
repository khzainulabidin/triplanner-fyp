import React from "react";
import {Avatar} from "@material-ui/core";
import styles from './Question.module.css';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import {Link} from "react-router-dom";

const Question = ({avatarSrc, question, date}) => {
    return(
        <div className={styles.question}>
            <div className={styles.question_avatar}>
                <Avatar alt="Person" src={avatarSrc}/>
            </div>

            <div className={styles.question_container}>
                <p className={styles.question_date}>{date}</p>
                <p>{question}</p>
                <div className={styles.question_btnContainer}>
                    <button>
                        <CheckOutlinedIcon style={{fontSize: '0.7rem'}}/> answer
                    </button>
                    <Link to={'/'}> view answers</Link>
                </div>
            </div>
        </div>
    );
};

export default Question;