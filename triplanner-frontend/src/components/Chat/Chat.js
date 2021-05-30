import style from './Chat.module.css';
import React from "react";

const Chat = ({avatar, name, lastMsg, setActive}) => {
    return(
        <div className={style.chat} onClick={() => setActive({avatar, name})}>
            <img src={avatar} alt={'Avatar'}/>
            <span className={style.chatText}>
                <h4>{name}</h4>
                <p>{lastMsg}</p>
            </span>
        </div>
    );
}

export default Chat;