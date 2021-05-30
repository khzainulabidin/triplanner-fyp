import React, {Fragment, useState} from "react";
import MyModal from "../MyModal/MyModal";
import styles from '../BookingModal/BookingModal.module.css';
import {formatDate} from "../../utils/misc";
import axios from "axios";
import {USERS_ROUTE} from "../../utils/routes";

const AdminUsersModal = ({user, setIsLoading, fetchUsers}) => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');

    const deleteUser = async () => {
        try{
            setIsLoading(true);
            const res = await axios.delete(`${USERS_ROUTE}/${user.userId}`, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            if (!data.success){
                setIsLoading(false);
                return setError('Unable to delete user');
            }
            setIsLoading(false);
            setOpen(false);
            fetchUsers();
        }
        catch (e){
            setIsLoading(false);
            setError('Unable to delete user');
        }
    }

    return(
        <Fragment>
            <p onClick={() => setOpen(true)} style={{color: '#04B6A9', cursor: "pointer"}}>View</p>
            <MyModal open={open} setOpen={setOpen}
                     actionText={'Delete User'}
                     action={deleteUser}
            >
                <div className={styles.modal}>
                    <p>{error}</p>
                    <p><b>Name: </b>{user.name}</p>
                    <p><b>Email: </b>{user.email}</p>
                    <p><b>Phone: </b>{user.phone}</p>
                    <p><b>City: </b>{user.city}</p>
                    <p><b>Email confirmed: </b>{user.confirmed ? 'Yes' : 'No'}</p>
                    <p><b>Account type: </b><span style={{textTransform: 'capitalize'}}>{user.accountType}</span></p>
                    <p><b>Member since: </b>{formatDate(new Date(user.createdAt).getTime())}</p>
                </div>
            </MyModal>
        </Fragment>
    );
}

export default AdminUsersModal;
