import style from '../../HotelAccount/Messages/Messages.module.css';
import React, {useState, Fragment, useEffect, useRef} from "react";
import MyTable from "../../../components/MyTable/MyTable";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import axios from "axios";
import {MESSAGES_ROUTE} from "../../../utils/routes";
import MyCard from "../../../components/MyCard/MyCard";
import MessageModal from "../../../components/MessageModal/MessageModal";
import TouristLayout from "../../../components/TouristLayout/TouristLayout";
import {formatDate} from "../../../utils/misc";

const TouristMessages = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [rows, setRows] = useState([]);

    const deleteMessage = async id => {
        try {
            setIsLoading(true);
            const res = await axios.delete(`${MESSAGES_ROUTE}/${id}`, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            setIsLoading(false);
            if (data.success){
                window.location.reload();
            }
        }
        catch (e){
            setIsLoading(false);
        }
    }

    function createData(name, message, deleteMessage, sentAt) {
        return {name, message, deleteMessage, sentAt};
    }

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'message', numeric: true, disablePadding: false, label: 'Message' },
        { id: 'deleteMessage', numeric: true, disablePadding: false, label: 'Delete' },
        { id: 'sentAt', numeric: true, disablePadding: false, label: 'Sent At' },
    ];

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current){
            return firstUpdate.current = false;
        }

        const localRows = [];
        for(let i=0; i<messages.length; i++){
            const message = messages[i];
            localRows.push(createData(
                message.hotelName,
                (<MessageModal message={message.message} id={message._id} replies={message.replies}/>),
                (<p onClick={() => deleteMessage(message._id)} style={{color: '#04B6A9', cursor: "pointer"}}>Delete</p>),
                formatDate(new Date(message.receivedAt)),
            ));
        }
        setRows(localRows);
        //eslint-disable-next-line
    }, [messages]);

    const fetchMessages = async () => {
        setIsLoading(true);
        const res = await axios.get(`${MESSAGES_ROUTE}/tourist`, {headers: {'x-access-token': localStorage.getItem('token')}});
        setIsLoading(false);
        const data = res.data;
        if (!data.success){
            setMessages([]);
        }
        else {
            setMessages(data.data.reverse());
        }
    }

    useEffect(() => {
        fetchMessages().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <TouristLayout isLoading={isLoading}>
            {isLoading ? null : messages ? (
                <Fragment>
                    <div style={{width: '100%'}}>

                        {messages.length > 0 ? (
                            <Fragment>
                                <MyTable rows={rows} headCells={headCells} type={'touristMessages'}/>
                            </Fragment>
                        ) : (
                            <MyCard>
                                <p className={style.noMessages}>No messages yet</p>
                            </MyCard>
                        )}
                    </div>
                </Fragment>) : <div className={'noUserContainer'}><NoUserWindow/></div>}
        </TouristLayout>
    );
}

export default TouristMessages;
