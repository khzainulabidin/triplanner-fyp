import styles from "../Place/Place.module.css";
import {getRating} from "../../utils/misc";
import {Fade} from "react-reveal";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React, {useEffect, useState} from "react";
import building from "../../assets/building.svg";
import building1 from "../../assets/building1.svg";
import building2 from "../../assets/building2.svg";
import {Link} from "react-router-dom";

const SuggestRoomCard = ({room, hotel, selectRoom, id}) => {
    const buildingIcons = [building, building1, building2];
    const [photo, setPhoto] = useState(buildingIcons[Math.floor(Math.random()*buildingIcons.length)]);
    const [rating, setRating] = useState(0);

    const fetchRating = async () => {
        const rating = await getRating(hotel.userId);
        setRating(rating);
    }

    useEffect(() => {
        const photoUrl = hotel.roomGallery[Math.floor(Math.random()*hotel.roomGallery.length)];
        setPhoto(`${process.env.REACT_APP_API_BASE_URL}/${photoUrl}`);
        fetchRating().catch(() => setRating(0));
        //eslint-disable-next-line
    }, []);

    return(
        <div className={styles.Place} style={{width: `100%`}}>
            <Fade>
                <img
                    src={photo}
                    alt={hotel.name}
                />
                <div style={{
                    background: '#04B6A9',
                    color: 'white',
                    padding: '0.8%',
                    fontSize: '0.8rem',
                    position: 'absolute',
                    borderRadius: '0 10px 10px 0',
                }}>
                    PKR {room.price}
                </div>
                <div className={styles.Place_infoContainer}>
                    <p className={'Place_type'}>{hotel.name} - A {hotel.starRating} star hotel</p>
                    <h3 style={{textTransform: 'capitalize'}}>{room.type} room</h3>

                    <div className={styles.Place_ratingContainer}>
                        {!rating || rating === 0 ? <p style={{fontSize: '0.7rem'}}>No reviews yet</p> : (
                            <Rating
                                value={rating}
                                precision={0.5}
                                icon={<FavoriteIcon style={{fontSize: '10px'}} />}
                                readOnly
                            />
                        )}
                    </div>
                    <p>{hotel.city}</p>
                    <Link
                        onClick={() => selectRoom({room, hotel, id})}
                        to={'/planTrip'}
                        style={{
                            background: '#04B6A9',
                            fontSize: '0.9rem',
                            marginTop: '3%',
                            textAlign: 'center',
                            color: 'white',
                            padding: '2% 0',
                            borderRadius: '10px'
                        }}>
                        Select this room</Link>
                </div>
            </Fade>
        </div>
    );
}

export default SuggestRoomCard;
