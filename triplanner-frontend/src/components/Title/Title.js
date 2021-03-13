import React from "react";
import {Button} from "@material-ui/core";
import styles from './Title.module.css';

const Title = ({title, titleHighlight, description, btnText, btnClick}) => (
    <div className={styles.title_textContainer}>
        <h1>{title} <b className={'colored-text'}>{titleHighlight}</b> </h1>
        {description ? <p>{description}</p> : null}
        {btnText ? <Button color="primary" onClick={btnClick}>{btnText}</Button> : null}
    </div>
);

export default Title;