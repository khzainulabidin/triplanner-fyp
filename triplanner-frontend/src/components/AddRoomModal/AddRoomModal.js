import MyModal from "../MyModal/MyModal";
import React, {Fragment, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {isValidNumber} from "../../utils/regex";
import ROOM_TYPES from "../../data/roomTypes";

const AddRoomModal = ({open, setOpen, addRoom, availableTypes}) => {
    const [input, setInput] = useState({
        type: '',
        number: '',
        price: ''
    });
    const [error, setError] = useState('');
    const [list] = useState(ROOM_TYPES.filter(type => !availableTypes.includes(type)));

    const handleAddRoom = () => {
        if (input.type === '' || input.number === '' || input.price === ''){
            return setError('All fields are required');
        }

        if (input.number < 1 || !isValidNumber(input.number)){
            return setError('Invalid number of rooms');
        }

        if (input.price < 1 || !isValidNumber(input.price)){
            return setError('Invalid price');
        }

        addRoom(input.type, Number(input.number), Number(input.price), Number(input.number));
        handleModal(false);
    }

    const handleModal = action => {
        setInput({
            type: '',
            number: '',
            price: ''
        });
        setError('');
        setOpen(action);
    }

    return(
        <MyModal open={open} setOpen={handleModal} actionText={'Add'} action={handleAddRoom}>
            <Fragment>
                <p style={{color: '#DD5145', fontSize: '80%', marginBottom: '3%'}}>{error}</p>
                <FormControl style={{width: '80%'}}>
                    <InputLabel id="room_type_label">Room Type</InputLabel>
                    <Select
                        label={'Room Type'}
                        labelId="room_type_label"
                        value={input.type}
                        name={'type'}
                        onChange={e => setInput({...input, type: e.target.value})}
                    >
                        {list.map((item, index) =>
                            <MenuItem key={index} value={item}>
                                <span style={{textTransform: 'capitalize'}}>{item}</span>
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>

                <TextField
                    label={'Number of rooms'}
                    type={'text'}
                    name={'number_of_rooms'}
                    required
                    style={{width: '80%'}}
                    value={input.number}
                    onChange={e => setInput({...input, number: e.target.value})}
                />
                <TextField
                    label={'Price per day'}
                    type={'text'}
                    name={'price'}
                    required
                    style={{width: '80%'}}
                    value={input.price}
                    onChange={e => setInput({...input, price: e.target.value})}
                />
            </Fragment>
        </MyModal>
    );
}

export default AddRoomModal;
