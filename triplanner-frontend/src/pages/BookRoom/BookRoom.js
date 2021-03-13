import React, {useState} from "react";
import styles from './BookRoom.module.css';
import NavBar from "../../components/NavBar/NavBar";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import search_icon from "../../assets/search_icon.png";
import lahore from '../../assets/lahore.jpg';
import murree from '../../assets/murree.jpg';
import karachi from '../../assets/karachi.jpg';

const BookRoom = () => {
    const [destination, setDestination] = useState('');

    const placeholder = 'Destination';

    return(
        <div>
            <NavBar/>
            <div className={styles.searchBox}>
                <div className={styles.wrapper}>
                    <div className={styles.fieldsContainer}>
                        <GooglePlacesAutocomplete
                            apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
                            apiOptions={{region: 'pk' }}
                            selectProps={{
                                destination,
                                onChange: setDestination,
                                styles: {
                                    container: (provided) => ({
                                        ...provided,
                                        height: '50px',
                                        width: '30%',
                                        position: 'relative',
                                        borderRadius: '10px',
                                        border: '2px solid #DDD',
                                        marginBottom: '30px',
                                        zIndex: '999'
                                    }),
                                    indicatorsContainer: (provided) => ({
                                        ...provided,
                                        background: 'transparent !important',
                                        color: 'transparent !important',
                                    }),
                                    dropdownIndicator: (provided) => ({
                                        ...provided,
                                        background: 'transparent !important',
                                        color: 'transparent !important',
                                    }),
                                    indicatorSeparator: (provided) => ({
                                        ...provided,
                                        background: 'transparent !important',
                                        color: 'transparent !important',
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        height: '50px',
                                        border: '0 none',
                                        outline: '0 none',
                                        fontSize: '18px',
                                        padding: '3px 40px 3px 20px',
                                        borderRadius: '10px',
                                    }),
                                    input: (provided) => ({
                                        ...provided,
                                        cursor: 'text',
                                    }),
                                    option: (provided) => ({
                                        ...provided,
                                        color: '#434141',
                                        cursor: 'pointer',
                                        zIndex: '999'
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: '#434141',
                                    }),
                                },
                                placeholder,
                            }}
                            debounce={1000}
                            withSessionToken
                        />

                        <input type={'date'} className={styles.datePicker} placeholder={'From'}/>
                        <input type={'date'} className={styles.datePicker} placeholder={'To'}/>

                        <FormControl variant="outlined" style={{width: '20%', marginLeft: '1%'}}>
                            <InputLabel>Room Type</InputLabel>
                            <Select label={'Room Type'} style={{background: '#FFF'}}>
                                <MenuItem value={'single'}>Single</MenuItem>
                                <MenuItem value={'double'}>Double</MenuItem>
                                <MenuItem value={'triple'}>Triple</MenuItem>
                                <MenuItem value={'quad'}>Quad</MenuItem>
                            </Select>
                        </FormControl>


                        <button className={styles.searchBtn} color="secondary" onClick={()=>{}}><img src={search_icon} alt={'Search'}/></button>
                    </div>
                </div>
            </div>

            <div className={styles.content}>
                <h1>Popular Destinations</h1>

                <div className={styles.destinations}>
                    <div className={styles.destination}>
                        <img src={lahore} alt={'Destination'}/>
                        <p>Lahore</p>
                    </div>
                    <div className={styles.destination}>
                        <img src={murree} alt={'Destination'}/>
                        <p>Murree</p>
                    </div>
                    <div className={styles.destination}>
                        <img src={karachi} alt={'Destination'}/>
                        <p>Karachi</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookRoom;