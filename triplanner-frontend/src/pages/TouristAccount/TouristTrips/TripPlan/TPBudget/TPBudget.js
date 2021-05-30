import TPCard from "../TPCard/TPCard";
import styles from "../TripPlan.module.css";
import style from "../../../../HotelAccount/Dashboard/Dashboard.module.css";
import MyPieChart from "../../../../../components/MyPieChart/MyPieChart";
import {Fragment} from "react";

const TPBudget = ({trip}) => {
    const budgetData = [
        { name: 'Available', value: trip.availableBudget},
        trip.bookings.length > 0 && { name: 'Bookings', value: trip.totalBudget - (trip.availableBudget + trip.fuelCost)},
        trip.usingOwnCar && { name: 'Fuel', value: trip.fuelCost},
    ];

    return(
        <Fragment>
            <TPCard className={styles.budgetContainer}>
                <div>
                    {Number(trip.availableBudget) < 0 && <h3 style={{marginBottom: '1%'}}>You have ran out of your budget</h3>}
                    <p style={{marginBottom: '2%'}}>
                        You will{!trip.usingOwnCar && ' not'} be using your own car {trip.usingOwnCar && `with a fuel average of ${trip.fuelAverage} kilometers per litre`}
                    </p>
                    <div className={styles.budgetDetails}>
                        <b>Total budget:</b>
                        <p>PKR {trip.totalBudget}</p>
                    </div>
                    {trip.usingOwnCar && <div className={styles.budgetDetails}>
                        <b>Approx. fuel cost:</b>
                        <p>PKR {trip.fuelCost}</p>
                    </div>}
                    {trip.bookings.length > 0 && <div className={styles.budgetDetails}>
                        <b>Bookings:</b>
                        <p>PKR {trip.totalBudget - (trip.availableBudget + trip.fuelCost)}</p>
                    </div>}
                    <div className={styles.budgetDetails}>
                        <b>Available budget:</b>
                        <p>PKR {trip.availableBudget}</p>
                    </div>
                </div>
            </TPCard>


            <TPCard className={styles.budgetContainer}>
                <div className={styles.budgetPie}>
                    <MyPieChart data={budgetData}/>
                    <div className={style.legend}>
                        <div style={{background: '#3236A7'}}/> Available
                        {trip.bookings.length > 0 && <Fragment><div style={{background: '#04B6A9'}}/> Bookings</Fragment>}
                        {trip.usingOwnCar && <Fragment><div style={{background: '#F2A433'}}/>Fuel Cost</Fragment>}
                    </div>
                </div>
            </TPCard>
        </Fragment>
    );
}

export default TPBudget;
