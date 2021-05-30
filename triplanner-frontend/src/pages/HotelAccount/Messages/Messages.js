import style from './Messages.module.css';
import BusinessLayout from "../../../components/BusinessLayout/BusinessLayout";
import React, {useState, Fragment, useEffect, useRef} from "react";
import MessagingFeature from "../../../components/MessagingFeature/MessagingFeature";
import MyTable from "../../../components/MyTable/MyTable";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import {getMe} from "../../../utils/auth";
import axios from "axios";
import {BUSINESS_MESSAGING, MESSAGES_ROUTE} from "../../../utils/routes";
import MyCard from "../../../components/MyCard/MyCard";
import MessageModal from "../../../components/MessageModal/MessageModal";
import {Fade} from "react-reveal";

const Messages = () => {
    const [messaging, setMessaging] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [rows, setRows] = useState([]);

    const updateMessaging = messagingStatus => {
        setIsLoading(true);
        axios.put(BUSINESS_MESSAGING, {messaging: messagingStatus}, {headers: {
            'x-access-token': localStorage.getItem('token')
        }}).then(res => {
            const data = res.data;
            if (!data.success){
                return setMessaging(messaging);
            }

            setMessaging(messagingStatus);
            fetchMessages().catch(() => setIsLoading(false));
            setIsLoading(false);
        })
    }

    function createData(name, email, phone, message, receivedAt) {
        return {name, email, phone, message, receivedAt};
    }

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'email', numeric: true, disablePadding: false, label: 'Email' },
        { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
        { id: 'message', numeric: true, disablePadding: false, label: 'Message' },
        { id: 'receivedAt', numeric: true, disablePadding: false, label: 'Received At' },
    ];

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current){
            return firstUpdate.current = false;
        }

        const localRows = [];
        for(let i=0; i<messages.length; i++){
            const message = messages[i];
            const date = new Date(message.receivedAt);
            localRows.push(createData(
                message.name,
                message.email,
                message.phone,
                (<MessageModal email={message.email} message={message.message}/>),
                `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            ));
        }
        setRows(localRows);
        //eslint-disable-next-line
    }, [messages]);

    const fetchMessages = async () => {
        setIsLoading(true);
        const res = await axios.get(`${MESSAGES_ROUTE}/business`, {headers: {'x-access-token': localStorage.getItem('token')}});
        const userRes = await getMe();
        setIsLoading(false);
        const data = res.data;
        if (!data.success){
            setMessages([]);
        }
        else {
            setMessages(data.data.reverse());
        }
        setUser(userRes);
        setMessaging(userRes.messaging);
    }

    useEffect(() => {
        fetchMessages().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <BusinessLayout isLoading={isLoading}>
            {isLoading ? null : user ? (
                <Fragment>
                    <Fade>
                        <div style={{width: '100%'}}>
                            <MessagingFeature messaging={messaging} setMessaging={updateMessaging}/>

                            {messaging ? messages.length > 0 ? (
                                <Fragment>
                                    <MyTable rows={rows} headCells={headCells} type={'messages'}/>
                                </Fragment>
                            ) : (
                                <MyCard>
                                    <p className={style.noMessages}>No messages yet</p>
                                </MyCard>
                            ) : null}
                        </div>
                    </Fade>
                </Fragment>) : <Fade><div className={'noUserContainer'}><NoUserWindow/></div></Fade>}
        </BusinessLayout>
    );
};

export default Messages;
