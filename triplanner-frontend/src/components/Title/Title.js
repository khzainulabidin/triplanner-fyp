import React from "react";
import {Button} from "@material-ui/core";
import styles from './Title.module.css';

const Title = ({title, titleHighlight, description, btnText}) => (
    <div className={styles.title_textContainer}>
        <h1>{title} <b className={'colored-text'}>{titleHighlight}</b> </h1>
        {description ? <p>{description}</p> : null}
        {btnText ? <Button color="primary">{btnText}</Button> : null}
    </div>
);

export default Title;