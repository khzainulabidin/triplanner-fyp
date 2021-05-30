import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import {useEffect, useState} from "react";
import MyCard from "../../../components/MyCard/MyCard";
import style from "../../HotelAccount/Dashboard/Dashboard.module.css";
import MyAreaChart from "../../../components/MyAreaChart/MyAreaChart";
import axios from "axios";
import {BOOKINGS_ROUTE, GET_ALL_TRIPS, USERS_ROUTE} from "../../../utils/routes";

const AdminDashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [usersData, setUsersData] = useState([]);
    const [bookingsData, setBookingsData] = useState([]);
    const [tripsData, setTripsData] = useState([]);
    const [users, setUsers] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [bookings, setBookings] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [trips, setTrips] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [usersTotal, setUsersTotal] = useState(0);
    const [bookingsTotal, setBookingsTotal] = useState(0);
    const [tripsTotal, setTripsTotal] = useState(0);

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

    const yearlyTrips = [
        {name: 'Jan', trips: trips[0],},
        {name: 'Feb', trips: trips[1],},
        {name: 'Mar', trips: trips[2],},
        {name: 'Apr', trips: trips[3],},
        {name: 'May', trips: trips[4],},
        {name: 'Jun', trips: trips[5],},
        {name: 'Jul', trips: trips[6],},
        {name: 'Aug', trips: trips[7],},
        {name: 'Sep', trips: trips[8],},
        {name: 'Oct', trips: trips[9],},
        {name: 'Nov', trips: trips[10],},
        {name: 'Dec', trips: trips[11],},
    ];

    const yearlyUsers = [
        {name: 'Jan', users: users[0],},
        {name: 'Feb', users: users[1],},
        {name: 'Mar', users: users[2],},
        {name: 'Apr', users: users[3],},
        {name: 'May', users: users[4],},
        {name: 'Jun', users: users[5],},
        {name: 'Jul', users: users[6],},
        {name: 'Aug', users: users[7],},
        {name: 'Sep', users: users[8],},
        {name: 'Oct', users: users[9],},
        {name: 'Nov', users: users[10],},
        {name: 'Dec', users: users[11],},
    ];

    useEffect(() => {
        let totalUsers = 0;
        const localUsers = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i=0; i<usersData.length; i++){
            const month = new Date(usersData[i].createdAt).getMonth();
            localUsers[month] = localUsers[month]+1;
            totalUsers = totalUsers+1;
        }

        setUsers(localUsers);
        setUsersTotal(totalUsers);
    }, [usersData])

    useEffect(() => {
        let totalTrips = 0;
        const localTrips = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i=0; i<tripsData.length; i++){
            const month = new Date(tripsData[i].createdAt).getMonth();
            localTrips[month] = localTrips[month]+1;
            totalTrips = totalTrips+1;
        }

        setTrips(localTrips);
        setTripsTotal(totalTrips);
    }, [tripsData])

    useEffect(() => {
        let totalBookings = 0;
        const localBookings = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        for (let i=0; i<bookingsData.length; i++){
            const month = new Date(bookingsData[i].bookedAt).getMonth();
            localBookings[month] = localBookings[month]+1;
            totalBookings = totalBookings+1;
        }

        setBookings(localBookings);
        setBookingsTotal(totalBookings);
    }, [bookingsData])

    const fetchData = async () => {
        setIsLoading(true);
        const userRes = await axios.get(USERS_ROUTE, {headers: {'x-access-token': localStorage.getItem('token')}});
        const userData = userRes.data;
        const usersDataArray = [];
        for (let i=0; i<userData.data.length; i++){
            usersDataArray.push({...userData.data[i].user, ...userData.data[i].account});
        }

        const tripsRes = await axios.get(GET_ALL_TRIPS, {headers: {'x-access-token': localStorage.getItem('token')}});
        const tripsData = tripsRes.data;

        const bookingsRes = await axios.get(BOOKINGS_ROUTE, {headers: {'x-access-token': localStorage.getItem('token')}});
        const bookingsData = bookingsRes.data;

        setUsersData(usersDataArray);
        setTripsData(tripsData.data);
        setBookingsData(bookingsData.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchData().catch(() => {
            setUsersData([]);
            setTripsData([]);
            setBookingsData([]);
            setIsLoading(false);
        })
    }, []);

    return(
        <AdminLayout isLoading={isLoading}>
            <div style={{width: '100%', display: "grid", gridTemplateColumns: '1fr 1fr', marginBottom: '2%', gridGap: '20px'}}>
                <MyCard>
                    <p className={style.statInfo} style={{fontSize: '0.9rem', padding: '2% 3%'}}>Users this year</p>
                    <MyAreaChart data={yearlyUsers} dataKey={'users'}/>
                </MyCard>

                <MyCard>
                    <div className={style.statCard} style={{justifyContent: "center", height: '100%'}}>
                        <p className={style.stat}>{usersTotal}</p>
                        <p className={style.info}>Users</p>
                    </div>
                </MyCard>
            </div>

            <div style={{width: '100%', display: "grid", gridTemplateColumns: '1fr 1fr', marginBottom: '2%', gridGap: '20px'}}>
                <MyCard>
                    <div className={style.statCard} style={{justifyContent: "center", height: '100%'}}>
                        <p className={style.stat}>{tripsTotal}</p>
                        <p className={style.info}>Trips</p>
                    </div>
                </MyCard>

                <MyCard>
                    <p className={style.statInfo} style={{fontSize: '0.9rem', padding: '2% 3%'}}>Trips this year</p>
                    <MyAreaChart data={yearlyTrips} dataKey={'trips'}/>
                </MyCard>
            </div>

            <div style={{width: '100%', display: "grid", gridTemplateColumns: '1fr 1fr', marginBottom: '2%', gridGap: '20px'}}>
                <MyCard>
                    <p className={style.statInfo} style={{fontSize: '0.9rem', padding: '2% 3%'}}>Bookings this year</p>
                    <MyAreaChart data={yearlyBookings} dataKey={"bookings"}/>
                </MyCard>

                <MyCard>
                    <div className={style.statCard} style={{justifyContent: "center", height: '100%'}}>
                        <p className={style.stat}>{bookingsTotal}</p>
                        <p className={style.info}>Bookings</p>
                    </div>
                </MyCard>
            </div>

        </AdminLayout>
    )
}

export default AdminDashboard;
