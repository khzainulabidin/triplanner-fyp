import styles from './Payments.module.css';
import BusinessLayout from "../../../components/BusinessLayout/BusinessLayout";
import React, {Fragment, useEffect, useRef, useState} from "react";
import {Fade} from "react-reveal";
import MessagingFeature from "../../../components/MessagingFeature/MessagingFeature";
import MyTable from "../../../components/MyTable/MyTable";
import MyCard from "../../../components/MyCard/MyCard";
import style from "../Messages/Messages.module.css";
import NoUserWindow from "../../../components/NoUserWindow/NoUserWindow";
import {getBookings, getMe} from "../../../utils/auth";
import {formatDate} from "../../../utils/misc";
import axios from "axios";
import {BUSINESS_COA, BUSINESS_PAYMENT_ACCOUNT} from "../../../utils/routes";

const Payments = () => {
    const [coaOption, setCoaOption] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [bookings, setBookings] = useState([]);
    const [earnings, setEarnings] = useState(0);
    const [refunds, setRefunds] = useState(0);
    const [rows, setRows] = useState([]);
    const [error, setError] = useState('');
    const [isAccountProvided, setIsAccountProvided] = useState(null);
    const [paymentAccount, setPaymentAccount] = useState({
        accountType: 'EasyPaisa',
        accountNumber: '',
    })

    function createData(roomType, status, payment, date) {
        return {roomType, status, payment, date};
    }

    const updateCoa = coaStatus => {
        setIsLoading(true);
        axios.put(BUSINESS_COA, {coaEnabled: coaStatus}, {headers: {
                'x-access-token': localStorage.getItem('token')
            }}).then(res => {
            const data = res.data;
            if (!data.success){
                return setCoaOption(coaOption);
            }

            setCoaOption(coaStatus);
            setIsLoading(false);
        }).catch(() => {
            setCoaOption(coaOption);
            setIsLoading(false);
        })
    }

    const updatePaymentAccount = async () => {
        try {
            setError('');
            if (paymentAccount.accountType === '' || paymentAccount.accountNumber === ''){
                return setError('All fields are required');
            }
            if (paymentAccount.accountNumber.length > 15){
                return setError('Invalid account number');
            }

            setIsLoading(true);
            const res = await axios.put(BUSINESS_PAYMENT_ACCOUNT, {paymentAccount}, {headers: {'x-access-token': localStorage.getItem('token')}});
            const data = res.data;
            if (!data.success){
                return setError('Unable to update payment account');
            }

            await fetchDetails();
            setIsLoading(false);
        }
        catch (e){
            return setError('All fields are required');
        }
    }

    const headCells = [
        { id: 'roomType', numeric: false, disablePadding: true, label: 'Room Type' },
        { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
        { id: 'payment', numeric: true, disablePadding: false, label: 'Payment' },
        { id: 'date', numeric: true, disablePadding: false, label: 'Received At' },
    ];

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current){
            return firstUpdate.current = false;
        }

        let localRows = [];

        for(let i=0; i<bookings.length; i++){
            const booking = bookings[i];
            localRows.push(createData(
                (<p style={{textTransform: 'capitalize'}}>{booking.roomType}</p>),
                (booking.status === 'Cancelled' ? <p style={{color: '#DD5347'}}>Refunded</p> : <p style={{color: '#04B6A9'}}>Earned</p>),
                (booking.status === 'Cancelled' ? <strike>{booking.payment}</strike> : <p>{booking.payment}</p>),
                formatDate(new Date(booking.bookedAt).getTime()),
            ));
        }
        setRows(localRows);
        //eslint-disable-next-line
    }, [bookings]);

    const fetchDetails = async () => {
        setIsLoading(true);
        const hotel = await getMe();
        if (!hotel){
            setIsLoading(false);
            return setUser(null);
        }
        setUser(hotel);
        setCoaOption(hotel.coaEnabled);
        setIsAccountProvided(hotel.paymentAccount);

        let localBookings = await getBookings('business');
        if (!localBookings){
            setBookings([]);
            localBookings = [];
        }
        else {
            setBookings(localBookings.reverse());
        }

        let localEarnings = 0, localRefunds = 0;
        for (let i=0; i<localBookings.length; i++){
            if (localBookings[i].status === 'Cancelled'){
                localRefunds = localRefunds + Number(localBookings[i].payment)
            }
            else {
                localEarnings = localEarnings + Number(localBookings[i].payment);
            }
        }
        setEarnings(localEarnings.toFixed(2));
        setRefunds(localRefunds.toFixed(2));
        setIsLoading(false);
    }

    useEffect(() => {
        fetchDetails().catch(() => setIsLoading(false));
        //eslint-disable-next-line
    }, [])

    return(
        <BusinessLayout isLoading={isLoading}>
            {isLoading ? null : user ? (
                <Fragment>
                    <Fade>
                        <div style={{width: '100%'}}>
                            <MessagingFeature
                                messaging={coaOption}
                                setMessaging={updateCoa}
                                title={'Cash On Arrival'}
                                desc={'By enabling this feature, you can allow customers to book rooms online and pay when they arrive. Online payment will still remain available'}
                            />

                            {error && <MyCard>
                                <p className={styles.error}>{error}</p>
                            </MyCard>}

                            <MyCard style={{padding: '5%'}}>
                                <p className={styles.accountInfoTitle}>Your account information</p>

                                {!isAccountProvided && <div className={styles.accountInfoForm}>
                                    <select className={'PTInput'} onChange={e => setPaymentAccount({...paymentAccount, accountType: e.target.value})}>
                                        <option value={'EasyPaisa'}>EasyPaisa</option>
                                        <option value={'JazzCash'}>JazzCash</option>
                                    </select>

                                    <input
                                        type={'text'}
                                        placeholder={'Account Number'}
                                        className={'PTInput'}
                                        value={paymentAccount.accountNumber}
                                        onChange={e => setPaymentAccount({...paymentAccount, accountNumber: e.target.value})}
                                    />
                                    <button className={styles.accountInfoSubmit} onClick={updatePaymentAccount}>Submit</button>
                                </div>}

                                {isAccountProvided && <p className={styles.alreadyAccount}>We are sending your payments to <b>{isAccountProvided.accountType}: {isAccountProvided.accountNumber.substr(0, 3)}{isAccountProvided.accountNumber.substring(3, isAccountProvided.accountNumber.length-2).split('').map((x, i) => <span key={i}>x</span>)}{isAccountProvided.accountNumber.substring(isAccountProvided.accountNumber.length-2, isAccountProvided.accountNumber.length)}</b>. Please contact Customer Support to update your account information.</p>}

                                {!isAccountProvided && <p className={styles.accountInfoDesc}>You won't be able to change it once you submit
                                    this form, so make sure you entered correct information.</p>}
                            </MyCard>

                            <div className={'PTGridContainer'}>
                                <MyCard>
                                    <div className={styles.statCard}>
                                        <p className={styles.statDesc}>Total earnings (PKR)</p>
                                        <p className={styles.statPrice}>{earnings}</p>
                                    </div>
                                </MyCard>

                                <MyCard>
                                    <div className={styles.statCard}>
                                        <p className={styles.statDesc}>Total refunds (PKR)</p>
                                        <p className={styles.statPrice}>{refunds}</p>
                                    </div>
                                </MyCard>
                            </div>

                            <div style={{margin: '2% 0'}}/>

                            {bookings ? bookings.length > 0 ? (
                                <Fragment>
                                    <MyTable rows={rows} headCells={headCells} type={'payments'}/>
                                </Fragment>
                            ) : (
                                <MyCard>
                                    <p className={style.noMessages}>No bookings yet</p>
                                </MyCard>
                            ) : null}
                        </div>
                    </Fade>
                </Fragment>) : <Fade><div className={'noUserContainer'}><NoUserWindow/></div></Fade>}
        </BusinessLayout>
    )
}

export default Payments;
