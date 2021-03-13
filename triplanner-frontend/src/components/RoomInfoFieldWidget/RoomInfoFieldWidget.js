import React from "react";
import styles from './RoomInfoFieldWidget.module.css';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

const RoomInfoFieldWidget = ({type, rooms, price, setRooms, setPrice}) => {

    return(
        <div className={styles.fieldWidget}>
            <FormControl variant="outlined" style={{width: '20%'}}>
                <InputLabel>Room Type</InputLabel>
                <Select label={'Room Type'} defaultValue={type} defaultChecked={true} disabled={true}>
                    <MenuItem value={'single'}>Single</MenuItem>
                    <MenuItem value={'double'}>Double</MenuItem>
                    <MenuItem value={'triple'}>Triple</MenuItem>
                    <MenuItem value={'quad'}>Quad</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label={'No. of rooms'}
                type={'number'}
                value={rooms}
                onChange={e => setRooms(e.target.value)}
                name={'rooms'}
                required
            />

            <TextField
                label={'Price per day'}
                type={'number'}
                value={price}
                onChange={e => setPrice(e.target.value)}
                name={'price'}
                required
            />
        </div>
    );
}

export default RoomInfoFieldWidget;