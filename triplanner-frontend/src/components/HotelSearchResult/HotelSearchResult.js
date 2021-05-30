import styles from './HotelSearchResult.module.css';
import {Rating} from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import building from '../../assets/building.svg';
import building1 from '../../assets/building1.svg';
import building2 from '../../assets/building2.svg';
import axios from "axios";
import {RATING_ROUTE} from "../../utils/routes";

const HotelSearchResult = ({name, location, hotelId, checkIn, checkOut}) => {
    const history = useHistory();
    const [icon, setIcon] = useState('');
    const buildingIcons = [building, building1, building2];
    const [rating, setRating] = useState(0);

    const fetchRating = async () => {
        const res = await axios.get(`${RATING_ROUTE}/${hotelId}`);
        const data = res.data;
        if (!data.success){
            setRating(0);
        }
        setRating(data.data);
    }

    useEffect(() => {
        setIcon(buildingIcons[Math.floor(Math.random()*buildingIcons.length)]);
        fetchRating().catch(() => setRating(0));
        //eslint-disable-next-line
    }, [name])

    const viewRooms = () => {
        history.push(`/availableRooms/${checkIn}/${checkOut}/${hotelId}`);
    }

    return(
        <div className={styles.hotel}>
            <div className={styles.hotelInfo}>
                <img src={icon} alt={'Hotel'}/>
                <div>
                    <h1 className={styles.hotelName}>{name}</h1>
                    <p className={styles.hotelLocation}>{location}</p>
                    {rating && rating > 0.4 ? <Rating
                        value={rating}
                        precision={0.5}
                        icon={<FavoriteIcon style={{fontSize: '15px'}}/>}
                        readOnly
                    /> : <p className={styles.hotelLocation} style={{fontSize: '0.8rem'}}>No reviews yet</p>}
                </div>
            </div>
            <button className={styles.viewRoomsBtn} onClick={viewRooms}>View Rooms</button>
        </div>
    );
}

export default HotelSearchResult;
