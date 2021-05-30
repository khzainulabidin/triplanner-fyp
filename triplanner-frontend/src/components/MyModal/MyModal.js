import style from './MyModal.module.css';
import CloseIcon from "@material-ui/icons/Close";
import {Slide} from 'react-reveal';
import React from "react";

const MyModal = ({open, setOpen, actionText, action, children, disabled=false, buttonsHidden}) => {
    return(
        <Slide left>
            <div className={style.modal} style={{display: open ? 'flex' : 'none'}}>
                <div className={style.modalContent}>
                    <div className={style.modalHeader}>
                        <CloseIcon style={{cursor: 'pointer'}} fontSize={'large'} onClick={() => setOpen(false)}/>
                    </div>

                    <div className={style.modalBody}>
                        {children}
                    </div>

                    {!buttonsHidden && <div className={style.modalFooter}>
                        <button onClick={() => setOpen(false)}>Close</button>
                        <button style={{background: '#3236A7', color: '#FFF'}} onClick={action}
                                disabled={disabled}>{actionText}</button>
                    </div>}
                </div>
            </div>
        </Slide>
    );
}

export default MyModal;
