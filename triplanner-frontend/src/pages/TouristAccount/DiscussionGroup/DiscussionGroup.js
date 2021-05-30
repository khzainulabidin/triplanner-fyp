import styles from './DiscussionGroup.module.css';
import {Link, useParams} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import {Send} from "@material-ui/icons";
import {getMe} from "../../../utils/auth";
import axios from "axios";
import {DISCUSSION_GROUP_ROUTE} from "../../../utils/routes";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import ErrorPageLayout from "../../../components/ErrorPageLayout/ErrorPageLayout";
import {Fade} from "react-reveal";

const DiscussionGroup = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({});
    const [group, setGroup] = useState({});
    const [message, setMessage] = useState('');

    const params = useParams();
    const {destinationId, departureTime} = params;

    const fetchGroup = async () => {
        const res = await axios.get(`${DISCUSSION_GROUP_ROUTE}/${destinationId}/${departureTime}`, {headers: {'x-access-token': localStorage.getItem('token')}});
        const data = res.data;
        if (!data.success){
            setIsLoading(false);
            return;
        }
        setGroup(data.data);
        window.scrollTo(0,document.body.scrollHeight);
    }

    const fetchData = async () => {
        setIsLoading(true);
        const user = await getMe();
        if (!user){
            setIsLoading(false);
            return;
        }
        setUser(user);
        fetchGroup().catch(() => setIsLoading(false));
        setIsLoading(false);
    }

    const sendMessage = async e => {
        e.preventDefault();
        if (message === ''){
            return;
        }

        const messageBody = {username: user.username, message, sentAt: new Date().getTime()}
        const res = await axios.put(
            DISCUSSION_GROUP_ROUTE,
            {destinationId, departureTime, message: messageBody},
            {headers: {'x-access-token': localStorage.getItem('token')}}
        );
        const data = res.data;
        if (!data.success){
            return;
        }
        setMessage('');
        setGroup(data.data);
    }

    useEffect(() => {
        fetchData().catch(() => setIsLoading(false));
        const interval = setInterval(fetchGroup, 10000);
        return () => {
            clearInterval(interval);
        }
        //eslint-disable-next-line
    }, [])

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            {!isLoading && user && <Fade>
                <div className={'backTopBar'}>
                    <Link to={'/commonPoint'}>Back</Link>
                </div>

                <form onSubmit={e => sendMessage(e)} className={styles.messageInputContainer}>
                    <input type={'text'} value={message} onChange={e => setMessage(e.target.value)} className={'PTInput'} placeholder={'Start typing...'}/>
                    <button type={'submit'} onClick={e => sendMessage(e)}><Send/></button>
                </form>

                <div className={styles.messages}>
                    {group && group.messages && group.messages.map((message, index) => (
                        <div key={index}
                             className={message.username === user.username ? [styles.messageContainer, styles.myMessageContainer].join(' ') : styles.messageContainer}>
                            <div
                                className={message.username === user.username ? [styles.message, styles.myMessage].join(' ') : styles.message}>{message.message}</div>
                            <p className={styles.username}>{message.username}</p>
                        </div>
                    ))}
                </div>
            </Fade>}

            {!isLoading && !user && <ErrorPageLayout text={'Cannot connect to the server'}/>}
        </Fragment>
    );
};

export default DiscussionGroup;
