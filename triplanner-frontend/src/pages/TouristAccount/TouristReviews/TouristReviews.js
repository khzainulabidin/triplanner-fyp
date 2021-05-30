import style from '../../HotelAccount/Messages/Messages.module.css';
import React, {useState, Fragment, useEffect, useRef} from "react";
import MyTable from "../../../components/MyTable/MyTable";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import axios from "axios";
import {REVIEWS_ROUTE} from "../../../utils/routes";
import MyCard from "../../../components/MyCard/MyCard";
import TouristLayout from "../../../components/TouristLayout/TouristLayout";
import TouristReviewsModal from "../../../components/TouristReviewsModal/TouristReviewsModal";

const TouristReviews = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [reviews, setReviews] = useState([]);
    const [rows, setRows] = useState([]);

    function createData(name, rating, details) {
        return {name, rating, details};
    }

    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
        { id: 'rating', numeric: true, disablePadding: false, label: 'Rating' },
        { id: 'details', numeric: true, disablePadding: false, label: 'Details' },
    ];

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current){
            return firstUpdate.current = false;
        }

        const localRows = [];
        for(let i=0; i<reviews.length; i++){
            const review = reviews[i];
            localRows.push(createData(
                review.name,
                review.rating,
                (<TouristReviewsModal review={review}/>),
            ));
        }
        setRows(localRows);
        //eslint-disable-next-line
    }, [reviews]);

    const fetchReviews = async () => {
        setIsLoading(true);
        const reviewsRes = await axios.get(REVIEWS_ROUTE, {headers: {'x-access-token': localStorage.getItem('token')}});
        const data = reviewsRes.data;
        setIsLoading(false);
        if (!data.success){
            return setReviews(false);
        }
        setReviews(data.data.reverse());
    }

    useEffect(() => {
        fetchReviews().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <TouristLayout isLoading={isLoading}>
            {isLoading ? null : reviews ? (
                <Fragment>
                    <div style={{width: '100%'}}>

                        {reviews.length > 0 ? (
                            <Fragment>
                                <MyTable rows={rows} headCells={headCells} type={'touristReviews'}/>
                            </Fragment>
                        ) : (
                            <MyCard>
                                <p className={style.noMessages}>No reviews yet</p>
                            </MyCard>
                        )}
                    </div>
                </Fragment>) : <div className={'noUserContainer'}><NoUserWindow/></div>}
        </TouristLayout>
    );
}

export default TouristReviews;
