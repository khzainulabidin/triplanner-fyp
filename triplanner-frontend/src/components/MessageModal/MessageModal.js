import React, {useState, Fragment} from "react";
import MyModal from "../MyModal/MyModal";
import axios from "axios";
import {MESSAGES_ROUTE} from "../../utils/routes";

const MessageModal = ({email, message, id}) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const deleteMessage = async () => {
        try {
            const res = await axios.delete(`${MESSAGES_ROUTE}/${id}`, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            if (!data.success){
                return setError(data.data);
            }

            setError('');
            setOpen(false);
            window.location.reload();
        }
        catch (e){
            setError('Cannot connect to the server');
        }
    }

    const actionText = email ? <a style={{color: '#FBFBFB'}} href={`mailto:${email}`}>Reply</a> : 'Unsend Message';
    const action = email ? ()=>{} : deleteMessage;

    return(
        <Fragment>
            <p onClick={() => setOpen(true)} style={{color: '#04B6A9', cursor: "pointer"}}>View</p>
            <MyModal open={open} setOpen={setOpen} actionText={actionText} action={action}>
                <p style={{color: '#DD5347', marginBottom: '2%'}}>{error}</p>
                <pre style={{textAlign: 'left'}}>{message}</pre>
            </MyModal>
        </Fragment>
    );
}

export default MessageModal;
