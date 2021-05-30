import axios from "axios";
import {BAN_USER, USERS_ROUTE} from "../../../utils/routes";
import React, {useEffect, useRef, useState} from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {Link} from "react-router-dom";
import AdminUsersModal from "../../../components/AdminUsersModal/AdminUsersModal";
import MyTable from "../../../components/MyTable/MyTable";
import MyCard from "../../../components/MyCard/MyCard";
import style from "../../HotelAccount/Messages/Messages.module.css";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";

const AdminUsers = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState([]);

    function createData(username, type, status, ban, view) {
        return {username, type, status, ban, view};
    }

    const headCells = [
        { id: 'username', numeric: false, disablePadding: true, label: 'Username' },
        { id: 'type', numeric: true, disablePadding: false, label: 'Type' },
        { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
        { id: 'ban', numeric: true, disablePadding: false, label: 'Ban' },
        { id: 'view', numeric: true, disablePadding: false, label: 'View' },
    ];

    const getColor = status => {
        switch (status){
            case 'Confirmed':
                return '#04B6A9';
            case 'Not Confirmed':
                return '#D4A013';
            case 'Banned':
                return '#DD5347';
            default:
                return '#000000'
        }
    }

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current){
            return firstUpdate.current = false;
        }

        let localRows = [];

        for(let i=0; i<users.length; i++){
            const user = users[i];
            const status = user.isBanned ? 'Banned' : user.confirmed ? 'Confirmed' : 'Not Confirmed';
            localRows.push(createData(
                user.username,
                (<p style={{textTransform: 'capitalize'}}>{user.accountType}</p>),
                (<p style={{color: getColor(status)}}>{status}</p>),
                (<Link to={'/admin/users'} onClick={() => banUser(user.userId, status === 'Banned' ? 'unban' : 'ban')}>{status === 'Banned' ? 'Unban' : 'Ban'}</Link>),
                (<AdminUsersModal user={user} setIsLoading={setIsLoading} fetchUsers={fetchUsers}/>),
            ));
        }
        setRows(localRows);
        //eslint-disable-next-line
    }, [users]);

    const fetchUsers = async () => {
        setIsLoading(true);
        const res = await axios.get(USERS_ROUTE, {headers: {'x-access-token': localStorage.getItem('token')}});
        const data = res.data;
        if (!data.success){
            return setIsLoading(false);
        }

        const usersData = [];
        for (let i=0; i<data.data.length; i++){
            usersData.push({...data.data[i].user, ...data.data[i].account});
        }

        setUsers(usersData.reverse());
        setIsLoading(false);
    }

    const banUser = async (id, update) => {
        try{
            setIsLoading(true);
            await axios.put(BAN_USER, {id, update}, {headers: {'x-access-token': localStorage.getItem('token')}});
            await fetchUsers();
            setIsLoading(false);
        }
        catch (e){
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers().catch(() => setIsLoading(false));
    }, []);

    return(
        <AdminLayout isLoading={isLoading}>
            {isLoading ? null : users ? users.length > 0 ?
                <MyTable rows={rows} headCells={headCells} type={'adminUsers'}/> :
                <div style={{width: '100%'}}>
                    <MyCard>
                        <p className={style.noMessages}>No users found</p>
                    </MyCard></div> :
                <div className={'noUserContainer'}><NoUserWindow/></div>
            }
        </AdminLayout>
    );
}

export default AdminUsers;
