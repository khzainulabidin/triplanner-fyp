import styles from '../TouristTrips/TouristTrips.module.css';
import TouristLayout from "../../../components/TouristLayout/TouristLayout";
import ReadyFor from "../../../components/ReadyFor/ReadyFor";
import React, {useEffect, useState} from "react";
import {getFriends, getMe} from "../../../utils/auth";
import MyCard from "../../../components/MyCard/MyCard";
import {Fade} from 'react-reveal';
import {Link} from "react-router-dom";
import {updateFriend} from "../../../utils/misc";
import MyModal from "../../../components/MyModal/MyModal";
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios";
import {GET_PROFILE_BY_USERNAME} from "../../../utils/routes";

const TouristFriends = () => {
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [mode, setMode] = useState('friends');
    const [open, setOpen] = useState(false);
    const [usernameInput, setUsernameInput] = useState('');
    const [searchedUser, setSearchedUser] = useState(null);

    const fetchFriends = async () => {
        setIsLoading(true);
        const friendsRes = await getFriends();
        if (!friendsRes){
            setIsLoading(false);
            return setFriends([]);
        }

        setFriends(friendsRes.reverse());
        setIsLoading(false);
    }

    const fetchRequests = async () => {
        setIsLoading(true);
        const user = await getMe();
        if (!user){
            setIsLoading(false);
            return setFriends([]);
        }

        const userFriendRequests = user.friendRequests.filter(friend => friend.status === 'Pending');
        setFriends(userFriendRequests.reverse());
        setIsLoading(false);
    }

    const searchUser = async () => {
        try {
            if (usernameInput.length < 4){
                return;
            }

            setIsLoading(true);
            const res = await axios.get(`${GET_PROFILE_BY_USERNAME}/${usernameInput}`);
            const data = res.data;
            if (!data.success){
                setIsLoading(false);
                return setSearchedUser(null);
            }

            setSearchedUser({...data.data.user, ...data.data.account});
            setIsLoading(false);
        }
        catch (e){
            setIsLoading(false);
            setSearchedUser(null);
        }
    }

    useEffect(() => {
        if (mode === 'friends'){
            fetchFriends().catch(() => setIsLoading(false));
        }
        else if (mode === 'requests'){
            fetchRequests().catch(() => setIsLoading(false));
        }
    }, [mode])

    return(
        <TouristLayout isLoading={isLoading}>
            <MyModal open={open} setOpen={setOpen} buttonsHidden={true}>
                <div className={styles.search}>
                    <input className={'PTInput'} placeholder={'Username'} value={usernameInput} onChange={e => setUsernameInput(e.target.value)} style={{borderRadius: '10px 0 0 10px'}}/>
                    <button onClick={searchUser}><SearchIcon/></button>
                </div>

                {searchedUser &&
                <MyCard style={{marginTop: '5%', boxShadow: '0 0 30px rgba(0, 0, 0, 0.2)'}}>
                    <div className={styles.tripContainer}>
                        <div className={styles.tripDesc} style={{display: 'flex'}}>
                            <img src={`${process.env.REACT_APP_API_BASE_URL}/${searchedUser.avatar}`} alt={'Search result'}
                                 style={{width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '3%'}}
                            />
                            <h4>{searchedUser.username}</h4>
                        </div>

                        <div className={styles.joinOptions} style={{marginTop: window.innerWidth < 768 ? '10%' : ''}}>
                            <Link to={`/profile/${searchedUser.username}`}>View</Link>
                        </div>
                    </div>
                </MyCard>
                }
            </MyModal>

            <div style={{width: '100%'}}>
                <ReadyFor title={'Connect with more travel buddies'} actionText={'Find friends'} onClick={() => setOpen(true)}/>

                <div className={styles.tripOptions}>
                    <h1 className={styles.heading}>
                        {mode === 'friends' && <Fade><span>My friends</span></Fade>}
                        {mode === 'requests' && <Fade><span>Friend requests</span></Fade>}
                    </h1>

                    <div>
                        {mode !== 'friends' && <Fade><p onClick={() => setMode('friends')}>My friends</p></Fade>}
                        {mode !== 'requests' && <Fade><p onClick={() => setMode('requests')}>View friend requests</p></Fade>}
                    </div>
                </div>

                {friends && friends.length > 0 ? friends.map((friend, index) => (
                    <Fade key={index}>
                        <MyCard>
                            <div className={styles.tripContainer}>
                                <div className={styles.tripDesc}>
                                    <h4 className={styles.friendUsername}>{friend.username}</h4>
                                </div>

                                {mode === 'friends' && <div className={styles.joinOptions}>
                                    <p className={styles.pLink} onClick={() => updateFriend(friend.username, 'Removed', setIsLoading)}>Remove</p>
                                    <Link to={`/profile/${friend.username}`}>View</Link>
                                </div>}

                                {mode === 'requests' && <div className={styles.joinOptions}>
                                    <p className={styles.pLink} onClick={() => updateFriend(friend.username, 'Accepted', setIsLoading)}>Accept</p>
                                    <p className={styles.pLink} onClick={() => updateFriend(friend.username, 'Declined', setIsLoading)}>Decline</p>
                                    <Link to={`/profile/${friend.username}`}>View</Link>
                                </div>}
                            </div>
                        </MyCard>
                    </Fade>
                )) : <Fade><MyCard>
                    {mode === 'friends' && <p className={styles.noTrips}>You have not made any friends</p>}
                    {mode === 'requests' && <p className={styles.noTrips}>No requests</p>}
                </MyCard></Fade>}
            </div>
        </TouristLayout>
    );
}

export default TouristFriends;
