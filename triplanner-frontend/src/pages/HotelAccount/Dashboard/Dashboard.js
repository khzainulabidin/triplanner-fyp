import {useEffect, useState, Fragment, useRef} from "react";
import style from './Dashboard.module.css';
import Calendar from 'react-calendar';
import BusinessLayout from "../../../components/BusinessLayout/BusinessLayout";
import MyAreaChart from "../../../components/MyAreaChart/MyAreaChart";
import MyPieChart from "../../../components/MyPieChart/MyPieChart";
import MyCard from "../../../components/MyCard/MyCard";
import {getBookings, getMe} from "../../../utils/auth";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [date, setDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [availableRooms, setAvailableRooms] = useState(0);
    const [totalRooms, setTotalRooms] = useState(0);
    const [arrivals, setArrivals] = useState(0);
    const [departures, setDepartures] = useState(0)
    const [bookings, setBookings] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [userBookings, setUserBookings] = useState([]);

    const localBookings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    const yearlyBookings = [
        {name: 'Jan', bookings: bookings[0],},
        {name: 'Feb', bookings: bookings[1],},
        {name: 'Mar', bookings: bookings[2],},
        {name: 'Apr', bookings: bookings[3],},
        {name: 'May', bookings: bookings[4],},
        {name: 'Jun', bookings: bookings[5],},
        {name: 'Jul', bookings: bookings[6],},
        {name: 'Aug', bookings: bookings[7],},
        {name: 'Sep', bookings: bookings[8],},
        {name: 'Oct', bookings: bookings[9],},
        {name: 'Nov', bookings: bookings[10],},
        {name: 'Dec', bookings: bookings[11],},
    ];

    const occupationData = [
        { name: 'Available', value: availableRooms === 0 && totalRooms === 0 ? 1 : availableRooms},
        { name: 'Occupied', value: totalRooms - availableRooms},
    ];

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current){
            return firstUpdate.current = false;
        }

        if (user){
            let checkins=0, checkouts=0;
            for (let i=0; i<userBookings.length; i++){
                const checkin = new Date(Number(userBookings[i].checkIn));
                const checkout = new Date(Number(userBookings[i].checkOut));
                if (userBookings[i].status !== 'Expired' && userBookings[i].status !== 'Cancelled'){
                    if (checkin.getDate() === new Date().getDate()){
                        checkins = checkins+1;
                    }

                    if (checkout.getDate() === new Date().getDate()){
                        checkouts = checkouts+1;
                    }
                }
                localBookings[checkin.getMonth()] = localBookings[checkin.getMonth()]+1;
            }

            let total=0, available=0;
            for (let i=0; i<user.rooms.length; i++){
                total = total + Number(user.rooms[i].fixedTotal);
                available = available + Number(user.rooms[i].number_of_rooms);
            }

            setBookings(localBookings);
            setArrivals(checkins);
            setDepartures(checkouts);
            setAvailableRooms(available);
            setTotalRooms(total);
        }
        //eslint-disable-next-line
    }, [user, userBookings]);

    const fetchData = async () => {
        setIsLoading(true);
        const userRes = await getMe();
        const bookingsRes = await getBookings('business');
        setUser(userRes);
        if (bookingsRes){
            setUserBookings(bookingsRes);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, []);

    return(
        <BusinessLayout isLoading={isLoading}>
            {isLoading ? null : user ? (
                <Fragment>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className={style.calendar}
                    />

                    <MyCard>
                        <p className={style.statInfo}>Bookings this year</p>
                        <MyAreaChart data={yearlyBookings} dataKey={"bookings"}/>
                    </MyCard>

                    <MyCard>
                        <p className={style.statInfo}>Currently occupied</p>
                        <MyPieChart data={occupationData}/>

                        <div className={style.legend}>
                            <div style={{background: '#3236A7'}}/> Available
                            <div style={{background: '#04B6A9'}}/> Occupied
                        </div>
                    </MyCard>

                    <div className={style.statsContainer}>
                        <div className={style.statCard}>
                            <p className={style.stat}>{arrivals}</p>
                            <p className={style.info}>Arrivals</p>
                        </div>
                        <div className={style.statCard}>
                            <p className={style.stat}>{departures}</p>
                            <p className={style.info}>Departures</p>
                        </div>
                        <div className={style.statCard}>
                            <p className={style.stat}>{availableRooms}</p>
                            <p className={style.info}>Available Rooms</p>
                        </div>
                        <div className={style.statCard}>
                            <p className={style.stat}>{totalRooms - availableRooms}</p>
                            <p className={style.info}>Occupied Rooms</p>
                        </div>
                    </div>
                </Fragment>) : <div className={'noUserContainer'}><NoUserWindow/></div>}
        </BusinessLayout>
    );
}

export default Dashboard;
