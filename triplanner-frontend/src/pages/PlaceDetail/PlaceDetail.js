import React, {useEffect, useState} from "react";
import Fade from 'react-reveal/Fade';
import NavBar from "../../components/NavBar/NavBar";
import PlaceJumbotron from "../../components/PlaceJumbotron/PlaceJumbotron";
import NearbyPlaces from "../../components/NearbyPlaces/NearbyPlaces";
import Reviews from "../../components/Reviews/Reviews";
import Footer from "../../components/Footer/Footer";
import {useSelector} from "react-redux";
import {selectPlace} from "../../redux/slices/explore/nearbyPlaces";

import av1 from "../../assets/av1.png";
import av2 from "../../assets/av2.png";

const PlaceDetail = () => {
    const place = useSelector(selectPlace);

    const [img, setImg] = useState(
        place.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${place.photos[0].photo_reference}&key=AIzaSyB832KgMGQLbv1FxFvsQVi3GQJfs__LQMc`
            : 'http://localhost:5000/images/image_placeholder.jpg'
    );

    useEffect(() => {
        if (place.photos){
            setImg(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photoreference=${place.photos[0].photo_reference}&key=AIzaSyB832KgMGQLbv1FxFvsQVi3GQJfs__LQMc`);
        }
        else {
            setImg('http://localhost:5000/images/image_placeholder.jpg');
        }
    }, [place]);

    const reviews = [
        {
            avatar: av1,
            review: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
        },
        {
            avatar: av2,
            review: 'Lorem Ipsum is simply dummy text'
        }
    ];

    const content = place ? (
        <Fade>
            <NavBar/>
            <PlaceJumbotron
                title={place.name}
                type={place.types[0].split('_').join(' ')}
                address={place.formatted_address}
                rating={place.rating}
                reviewsCount={place.user_ratings_total}
                reviews={reviews}
                image={img}
            />
            <NearbyPlaces location={{
                lat: place.geometry.location.lat,
                lng: place.geometry.location.lng,
            }}/>
            <Reviews bg={img}/>
            <Footer/>
        </Fade>
    ) : (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h1 style={{fontWeight: 300, fontSize: '200%'}}>Something went wrong!</h1>
        </div>
    );

    return(
        content
    );
};

export default PlaceDetail;