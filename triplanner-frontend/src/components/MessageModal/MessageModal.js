import React, {useState, Fragment} from "react";
import MyModal from "../MyModal/MyModal";
import axios from "axios";
import {MESSAGES_REPLY_ROUTE} from "../../utils/routes";
import {formatDate} from "../../utils/misc";

const MessageModal = ({email, message, id, replies}) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');
    const [replyMode, setReplyMode] = useState(false);
    const [reply, setReply] = useState('');

    const sendReply = async () => {
        try {
            const res = await axios.post(
                MESSAGES_REPLY_ROUTE,
                {id, reply},
                {headers: {'x-access-token': localStorage.getItem('token')}}
            );
            const data = res.data;
            if (!data.success){
                return setError(data.data);
            }
            setError('');
            setReply('');
            setReplyMode(false);
            setOpen(false);
        }
        catch (e){
            setError('Unable to send reply');
        }
    }

    const handleOpen = update => {
        setReply('');
        setError('');
        setReplyMode(false);
        setOpen(update);
    }

    const actionText = replyMode ? 'Send' : 'Reply';
    const action = replyMode ? sendReply : () => {
        setError('');
        setReplyMode(true);
    };

    return(
        <Fragment>
            <p onClick={() => setOpen(true)} style={{color: '#04B6A9', cursor: "pointer"}}>View</p>
            <MyModal open={open} setOpen={replyMode ? handleOpen : setOpen} actionText={actionText} action={action}>
                <p style={{color: '#DD5347', marginBottom: '2%'}}>{error}</p>
                {!replyMode && <pre style={{textAlign: 'left'}}>{message}</pre>}
                {!replyMode && replies && replies.length > 0 && (
                    <div style={{textAlign: 'left', marginTop: '2%'}}>
                        <b>Replies:</b>
                        {replies.reverse().map((reply, index) => <div key={index} style={{margin: '1% 0'}}>
                            <p style={{color: 'rgba(0, 0, 0, 0.6)', fontSize: '0.8rem'}}>{formatDate(reply.sentAt)}</p>
                            <pre style={{textAlign: 'left'}}>{reply.text}</pre>
                        </div>)}
                    </div>
                )}
                {replyMode && <div style={{width: '100%', textAlign: 'left'}}>
                    <textarea
                        style={{
                            width: '100%',
                            height: '100%',
                            resize: "none",
                            padding: '5%',
                            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)'
                        }}
                        className={'PTInput'} rows={15}
                        placeholder={'Your reply...'}
                        required
                        value={reply}
                        onChange={e => setReply(e.target.value)}
                    />
                </div>}
            </MyModal>
        </Fragment>
    );
}

export default MessageModal;
