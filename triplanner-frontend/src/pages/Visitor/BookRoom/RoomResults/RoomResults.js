import styles from './RoomResults.module.css';
import NavBar from "../../../../components/NavBar/NavBar";
import {Link, useParams} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import HotelSearchResult from "../../../../components/HotelSearchResult/HotelSearchResult";
import axios from "axios";
import {GET_BUSINESSES_BY_LOCATION} from "../../../../utils/routes";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import FacilitiesBox from "../../../../components/FacilitiesBox/FacilitiesBox";
import {bestOption, formatDate} from "../../../../utils/misc";

const RoomResults = () => {
    const params = useParams();
    const {destination, checkIn, checkOut} = params;
    const [maxBudget, setMaxBudget] = useState('');
    const [hotels, setHotels] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filters, setFilters] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [sortType, setSortType] = useState('rating');
    const [bestHotel, setBestHotel] = useState({});

    const applyMaxBudget = () => {
        if (maxBudget !== '' && maxBudget !== undefined && Number(maxBudget) > 0){
            let foundGreater=false, temp=[];

            for (let i=0; i<hotels.length; i++){
                for (let j=0; j<hotels[i].rooms.length; j++){
                    if (Number(hotels[i].rooms[j].price) > Number(maxBudget)){
                        foundGreater = true;
                        break;
                    }
                }
                if (!foundGreater){
                    temp.push(hotels[i]);
                }
                foundGreater = false;
            }

            setFilters([]);
            setFilteredHotels(temp);
        }
    }

    const clearMaxBudget = () => {
        setFilteredHotels(hotels);
        setMaxBudget('');
    }

    const sortByRating = arr => {
        return arr.sort((a, b) => a.userRating < b.userRating ? 1 : -1);
    }

    const sortByPriceLTH = arr => {
        for (let i=0; i<arr.length; i++){
            if (arr[i].rooms.length > 0){
                arr[i].rooms.sort((a, b) => Number(a.price) > Number(b.price) ? 1 : -1);
            }
        }
        return arr.sort((a, b) => Number(a.rooms[0].price) > Number(b.rooms[0].price) ? 1 : -1);
    }

    const sortByPriceHTL = arr => {
        for (let i=0; i<arr.length; i++){
            if (arr[i].rooms.length > 0){
                arr[i].rooms.sort((a, b) => Number(a.price) < Number(b.price) ? 1 : -1);
            }
        }
        return arr.sort((a, b) => Number(a.rooms[0].price) < Number(b.rooms[0].price) ? 1 : -1);
    }

    const compareFilters = (arr1, arr2) => {
        return arr2.every(v => arr1.includes(v))
    }

    const updateSort = (sort) => {
        let updatedResults;

        if (sort === 'rating'){
            updatedResults = sortByRating(filteredHotels);
        }

        else if (sort === 'priceLTH') {
            updatedResults = sortByPriceLTH(filteredHotels);
        }

        else if (sort === 'priceHTL') {
            updatedResults = sortByPriceHTL(filteredHotels);
        }

        else {
            updatedResults = filteredHotels;
        }

        setFilteredHotels(updatedResults);
        setSortType(sort);
    }

    useEffect(() => {
        if (filters.length === 0){
            return setFilteredHotels(hotels);
        }

        const filteredResults = hotels.filter(hotel => compareFilters(hotel.facilities, filters));
        setFilteredHotels(filteredResults);
        //eslint-disable-next-line
    }, [filters]);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${GET_BUSINESSES_BY_LOCATION}/${destination}`).then(res => {
            setIsLoading(false);
            const data = res.data;
            if (!data.success){
                return setHotels([]);
            }

            setHotels(data.data);

            const sortedData = sortByRating(data.data);
            setFilteredHotels(sortedData);

            const best = bestOption(data.data);
            setBestHotel(best[0]);
        }).catch(() => {
            setIsLoading(false);
        });
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <div className={styles.roomResults}>
                <NavBar/>
                <div className={styles.roomResultsContainer}>
                    <div>
                        <div className={styles.filtersContainer}>
                            <h4>Maximum Budget</h4>
                            <div className={styles.maxBudget}>
                                <input type={'number'} placeholder={'Max. budget'} min={1} value={maxBudget} onChange={e => setMaxBudget(e.target.value)}/>
                                <button onClick={applyMaxBudget}>Apply</button>
                                <button onClick={clearMaxBudget}>X</button>
                            </div>
                        </div>

                        <div className={styles.filtersContainer}>
                            <h4>Sort By</h4>
                            <div className={styles.maxBudget}>
                                <select value={sortType} onChange={e => updateSort(e.target.value)}>
                                    <option value={'rating'}>Best rating</option>
                                    <option value={'priceLTH'}>Price low to high</option>
                                    <option value={'priceHTL'}>Price high to low</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.filtersContainer}>
                            <h4>Filters</h4>
                            <div>
                                <FacilitiesBox facility={'Parking'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'Breakfast'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'Fitness Center'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'Swimming Pool'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'Wheelchair Accessible'} facilities={filters} setFacilities={setFilters}/>
                            </div>
                        </div>

                        <div className={styles.filtersContainer}>
                            <h4>View</h4>
                            <div>
                                <FacilitiesBox facility={'City View'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'Garden View'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'Lake View'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'Landmark View'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'Mountain View'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'Pool View'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'River View'} facilities={filters} setFacilities={setFilters}/>
                                <FacilitiesBox facility={'Ocean View'} facilities={filters} setFacilities={setFilters}/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={styles.resultsInfo}>
                            <div>
                                <p>Showing results for <b>{destination}</b></p>
                                <p className={styles.date}>{formatDate(checkIn)} - {formatDate(checkOut)}</p>
                            </div>
                            <Link to={'/bookRoom'}>Modify search</Link>
                        </div>

                        {hotels.length > 0 ?
                        <Fragment>
                            <div className={styles.bestOption}>
                                <p className={styles.desc}>{hotels.length === 1 ? 'Only hotel registered on TriPlanner, for this location' : 'Best Option'}</p>
                                <HotelSearchResult
                                    name={bestHotel.name}
                                    location={bestHotel.city}
                                    hotelId={bestHotel.userId}
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                />
                            </div>

                            {filteredHotels.filter(hotel => hotel._id !== bestHotel._id).map((hotel, index) => (
                                <HotelSearchResult
                                    key={index}
                                    name={hotel.name}
                                    location={hotel.city}
                                    hotelId={hotel.userId}
                                    checkIn={checkIn}
                                    checkOut={checkOut}
                                />
                            ))}

                        </Fragment> :

                            <div className={styles.resultsInfo}>
                                <p>No results found for your destination</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default RoomResults;
