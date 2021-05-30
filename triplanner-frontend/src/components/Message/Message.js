import style from './Message.module.css';
import React from "react";

const Message = ({isSender, text}) => {
    return(
        <div className={isSender ? [style.message, style.senderMessage].join(' ') : style.message}>
            <span>{text}</span>
        </div>
    );
}

export default Message;