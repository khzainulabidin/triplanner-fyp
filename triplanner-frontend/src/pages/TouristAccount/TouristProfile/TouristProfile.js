import {useState, useEffect} from "react";
import style from '../../HotelAccount/Profile/Profile.module.css';
import CoverPhoto from "../../../components/CoverPhoto/CoverPhoto";
import ProfilePhoto from "../../../components/ProfilePhoto/ProfilePhoto";
import MyCard from "../../../components/MyCard/MyCard";
import {Link, useHistory} from "react-router-dom";
import placeholder from '../../../assets/placeholder.png';
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import {deleteAccount, myProfile, otherProfile} from "../../../utils/auth";
import MyModal from "../../../components/MyModal/MyModal";
import WcIcon from '@material-ui/icons/Wc';
import CakeIcon from '@material-ui/icons/Cake';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import TouristLayout from "../../../components/TouristLayout/TouristLayout";
import {useParams} from "react-router-dom";
import {updateFriend} from "../../../utils/misc";

const TouristProfile = () => {
    const [coverPhoto, setCoverPhoto] = useState(placeholder);
    const [profilePhoto, setProfilePhoto] = useState(placeholder);
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteName, setDeleteName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [myFriends, setMyFriends] = useState([]);
    const [isFriend, setIsFriend] = useState(false);
    const [isPendingRequest, setIsPendingRequest] = useState(false);

    const params = useParams();
    const {username} = params;

    const history = useHistory();

    const handleDeleteAccount = () => {
        setIsLoading(true);
        const isDeleted = deleteAccount('tourist');
        setIsLoading(false);
        if (!isDeleted){
            return setError('Unable to delete your account at this time. Please try again.');
        }

        localStorage.clear();
        sessionStorage.clear();
        history.push('/');
    }

    useEffect(() => {
        const friend = myFriends.some(friend => friend.username === username && friend.status === 'Accepted');
        setIsFriend(friend);
        if (!friend){
            const pending = myFriends.some(friend => friend.username === username && friend.status === 'Pending');
            setIsPendingRequest(pending);
        }
        //eslint-disable-next-line
    }, [myFriends])

    useEffect(() => {
        if (username){
            otherProfile(username, setIsLoading, setUser, setProfilePhoto, setCoverPhoto, setMyFriends, history).catch(() => {
                setIsLoading(false);
                setUser(null);
            });
        }
        else {
            myProfile(setIsLoading, setUser, setProfilePhoto, setCoverPhoto);
        }
        //eslint-disable-next-line
    }, []);

    return(
        <TouristLayout isLoading={isLoading}>
            {isLoading ? null : user ? (
                <div style={{width: '100%'}}>
                    <MyModal open={open} setOpen={setOpen} actionText={'Delete my account'} action={handleDeleteAccount} disabled={user.name !== deleteName}>
                        <p className={style.error}>{error}</p>
                        Are you sure to want to permanently delete your account?
                        <p className={style.modalDesc}>This cannot be undone and all data including trips, bookings and reviews will be permanently deleted.</p>
                        <p className={style.modalDesc} style={{marginTop: '8%'}}>To continue, please enter your complete name</p>
                        <input type={'text'} value={deleteName} onChange={e => setDeleteName(e.target.value)} placeholder={'Your name'} className={style.modalInput}/>
                    </MyModal>

                    <CoverPhoto coverPhoto={coverPhoto} setCoverPhoto={setCoverPhoto}/>
                    <ProfilePhoto profilePhoto={profilePhoto} setProfilePhoto={setProfilePhoto}/>

                    <div className={style.content}>
                        <MyCard>
                            <div style={{padding: '3% 5%'}}>
                                <p className={style.name}>
                                    <span>{user.name}</span>
                                </p>

                                <p className={style.userDesc} style={{marginBottom: '5%'}}>Lives in <b>{user.city}</b> {!user.interests || user.interests.length === 0 ?
                                    null :
                                    <span> and likes {user.interests.length === 1 ?
                                        user.interests[user.interests.length-1] :
                                        user.interests.slice(0, user.interests.length-1).join(', ')} and {user.interests[user.interests.length-1]}
                                    </span>}</p>

                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', marginTop: window.innerWidth < 768 ? '10%' : ''}} className={style.userDesc}>
                                    <div className={style.contactInfo} style={{marginTop: '3%', alignItems: 'center'}}>
                                        <WcIcon style={{color: '#7D7D7D'}} fontSize={window.innerWidth < 768 ? 'small' : 'medium'}/>
                                        <p style={{textTransform: 'capitalize', marginLeft: '5%'}}>{user.gender}</p>
                                    </div>

                                    <div className={style.contactInfo} style={{marginTop: '3%', alignItems: 'center'}}>
                                        <CakeIcon style={{color: '#7D7D7D'}} fontSize={window.innerWidth < 768 ? 'small' : 'medium'}/>
                                        <p style={{marginLeft: '5%'}}>{user.dob}</p>
                                    </div>

                                    <div className={style.contactInfo} style={{marginTop: '3%', alignItems: 'center'}}>
                                        <MailOutlineIcon style={{color: '#7D7D7D'}} fontSize={window.innerWidth < 768 ? 'small' : 'medium'}/>
                                        <p style={{marginLeft: '5%'}}>{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        </MyCard>

                        <MyCard style={{height: '65%'}}>
                            {!username && <div className={style.links}>
                                <Link to={'/createProfile/edit'}>Edit profile</Link>
                                <Link to={'/account/interests'}>Update hobbies</Link>
                                <Link to={'/profile'} onClick={() => setOpen(true)} style={{color: '#DD5145'}}>Delete your account</Link>
                            </div>}

                            {username && !isFriend && !isPendingRequest && <div className={style.links} style={{alignItems: 'center', justifyContent: "center"}}>
                                <Link to={`/profile/${username}`} onClick={() => updateFriend(username, 'Pending', setIsLoading)} className={[style.friendButton, style.addFriend].join(' ')}>Add friend</Link>
                            </div>}

                            {username && !isFriend && isPendingRequest && <div className={style.links} style={{alignItems: 'center', justifyContent: "center"}}>
                                <Link to={`/profile/${username}`} onClick={() => updateFriend(username, 'Cancelled', setIsLoading)} className={[style.friendButton, style.removeFriend].join(' ')}>Remove request</Link>
                            </div>}

                            {username && isFriend && !isPendingRequest && <div className={style.links} style={{alignItems: 'center', justifyContent: "center"}}>
                                <Link to={`/profile/${username}`} onClick={() => updateFriend(username, 'Removed', setIsLoading)} className={[style.friendButton, style.removeFriend].join(' ')}>Remove friend</Link>
                            </div>}
                        </MyCard>
                    </div>
                </div>) : <div className={'noUserContainer'}><NoUserWindow/></div>
            }
        </TouristLayout>
    );
};

export default TouristProfile;
