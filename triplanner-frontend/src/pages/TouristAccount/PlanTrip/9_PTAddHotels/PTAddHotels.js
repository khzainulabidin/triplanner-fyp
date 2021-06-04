import React, {Fragment, useEffect, useState} from "react";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import PlanTripLayout from "../../../../components/PlanTripLayout/PlanTripLayout";
import axios from "axios";
import {GET_BUSINESSES_BY_LOCATION} from "../../../../utils/routes";
import {bestOption, getRating} from "../../../../utils/misc";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SuggestRoomCard from "../../../../components/SuggestRoomCard/SuggestRoomCard";
import CloseIcon from "@material-ui/icons/Close";
import {v4 as uuid} from 'uuid';

const PTAddHotels = ({progress, action, inputs, setInputs, clickBack}) => {
    const [error, setError] = useState('');
    const [textError, setTextError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);

    const handleNext = () => {
        setInputs({...inputs, selectedRooms});
        action();
    }

    const fetchHotels = async () => {
        if (inputs.placesToStay.length < 1){
            return setTextError("You are not staying anywhere. However if you've changed your mind, you can still book hotel room separately after creating this trip plan");
        }

        setIsLoading(true);
        const localHotels = [];
        for (let i=0; i<inputs.placesToStay.length; i++){
            const place = inputs.placesToStay[i].name;
            const res = await axios.get(`${GET_BUSINESSES_BY_LOCATION}/${place}`);
            const data = res.data;
            if (!data.success){
                localHotels.push(null);
            }
            else {
                for (let i=0; i<data.data.length; i++){
                    data.data[i].userRating = await getRating(data.data[i].userId);
                }
                const bestHotel = bestOption(data.data);
                localHotels.push(bestHotel[0]);
            }
        }
        setHotels(localHotels);
        setIsLoading(false);
    }

    const selectRoom = room => {
        const updatedBudget = (Number(inputs.availableBudget)-Number(room.room.price)).toFixed(1);
        setSelectedRooms([...selectedRooms, room]);
        setInputs({...inputs, availableBudget: updatedBudget});
    }

    const removeRoom = room => {
        const updatedBudget = (Number(inputs.availableBudget)+Number(room.room.price)).toFixed(1);
        const updatedRooms = selectedRooms;
        const idx = updatedRooms.findIndex(oldRoom => oldRoom.room.type !== room.room.type && oldRoom.hotel.name !== room.hotel.name && oldRoom.hotel.city !== room.hotel.city);
        updatedRooms.splice(idx,1);
        setSelectedRooms(updatedRooms);
        setInputs({...inputs, availableBudget: updatedBudget});
    }

    useEffect(() => {
        setHotels(hotels);
        //eslint-disable-next-line
    }, [inputs.availableBudget])

    useEffect(() => {
        fetchHotels().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            <PlanTripLayout
                title={<span>Hotels based on your <b>budget</b></span>}
                error={error}
                setError={setError}
                progress={progress}
                action={handleNext}
                actionText={'Next'}
                clickBack={clickBack}
                inputs={inputs}
                skippable={true}
                skipAction={action}
                description={"We suggest you the best hotels based on your budget. However right now this booking process supports one day booking. If you have plans to stay for more than one day then you must book room separately after creating this trip plan"}
            >
                {isLoading ? null : hotels.length > 0 ?
                    <Fragment>
                        {selectedRooms.map((room, index) => (
                            <div className={'PTNoPlaces'} style={{marginBottom: '2%'}} key={index}>
                                <CloseIcon style={{cursor: 'pointer'}} onClick={() => removeRoom(room)}/>
                                <p style={{fontWeight: '600'}}><span style={{textTransform: 'capitalize'}}>{room.room.type}</span> Room in {room.hotel.name} for PKR {room.room.price}</p>
                            </div>
                        ))}

                        <p style={{background: '#04B6A9', marginBottom: '2%', margin: window.innerWidth > 768 ? '' : '5% 0', padding: window.innerWidth > 768 ? '1% 3%' : '2% 5%', color: 'white', width: 'fit-content', borderRadius: '10px'}}>
                            Available budget: PKR {inputs.availableBudget}
                        </p>

                        <div className={'PTHotelsContainer'}>
                            {hotels.map((hotel, index) => (
                                <div style={{margin: '3% 0'}} key={index}>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <h4>{inputs.placesToStay[index].name}</h4></div>
                                    <hr style={{marginBottom: '2%'}}/>
                                    {hotel && hotel.rooms.filter(room => (Number(room.price) <= Number(inputs.availableBudget)) && Number(room.number_of_rooms) > 0).length > 0 ?
                                        <div style={{display: "grid", gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr 1fr' : '1fr', gridGap: '10px'}}>
                                            {hotel.rooms
                                                .filter(room => (Number(room.price) <= Number(inputs.availableBudget)) && Number(room.number_of_rooms) > 0)
                                                .map(room => (
                                                    <SuggestRoomCard room={room} hotel={hotel} selectRoom={selectRoom} id={uuid()} key={uuid()}/>
                                                ))
                                            }
                                        </div> : (
                                            <div className={'PTNoPlaces'} style={{marginBottom: '2%'}}>
                                                <SentimentVeryDissatisfiedIcon fontSize={'large'}/>
                                                <p>Based on your budget, we have no rooms available for this location. However, you can also book room separately after creating this trip plan</p>
                                            </div>
                                        )
                                    }

                                </div>
                            ))}
                        </div>
                    </Fragment>: (
                    <div className={'PTNoPlaces'}>
                        <SentimentVeryDissatisfiedIcon fontSize={'large'}/>
                        <p>{textError}</p>
                    </div>
                )}
            </PlanTripLayout>
        </Fragment>
    );
};

export default PTAddHotels;
