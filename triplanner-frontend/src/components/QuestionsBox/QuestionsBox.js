import React, {useState} from "react";
import styles from "../Reviews/Reviews.module.css";
import Question from "../Question/Question";
import av3 from "../../assets/av3.png";
import SliderNextButton from "../SliderNextButton/SliderNextButton";
import SliderPrevButton from "../SliderPrevButton/SliderPrevButton";

const QuestionsBox = () => {
    const [startingIndex, setStartingIndex] = useState(0);
    const [endingIndex, setEndingIndex] = useState(4);
    const questions = [
        {
            avatar: av3,
            question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            date: 'November 12, 2020'
        },
        {
            avatar: av3,
            question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            date: 'November 12, 2020'
        },
        {
            avatar: av3,
            question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            date: 'November 12, 2020'
        },
        {
            avatar: av3,
            question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            date: 'November 12, 2020'
        },
        {
            avatar: av3,
            question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            date: 'November 12, 2020'
        },
        {
            avatar: av3,
            question: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
            date: 'November 12, 2020'
        },
    ];

    return(
        <div className={styles.content_box}>
            <div className={styles.reviews_box}>
                {questions.slice(startingIndex, endingIndex).map((question, index) => (
                    <Question
                        key={index}
                        avatarSrc={question.avatar}
                        question={question.question}
                        date={question.date}
                    />
                ))}
            </div>

            <div className={styles.btnContainer}>
                <SliderPrevButton
                    startingIndex={startingIndex}
                    endingIndex={endingIndex}
                    setStartingIndex={setStartingIndex}
                    setEndingIndex={setEndingIndex}
                    count={4}
                />

                <SliderNextButton
                    startingIndex={startingIndex}
                    endingIndex={endingIndex}
                    setStartingIndex={setStartingIndex}
                    setEndingIndex={setEndingIndex}
                    count={4}
                    length={questions.length}
                />
            </div>
        </div>
    );
};

export default QuestionsBox;