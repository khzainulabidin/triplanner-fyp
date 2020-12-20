import React, {useState} from "react";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import styles from "../Reviews/Reviews.module.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CheckBox from "../CheckBox/CheckBox";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";

const ReviewsBoxOptions = () => {
    const [mode, setMode] = useState('most_agrees');
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <div>
            <FormControl>
                <Select value={mode} onChange={e => setMode(e.target.value)}>
                    <MenuItem value={'most_agrees'}>Most Agrees</MenuItem>
                    <MenuItem value={'highest_rating'}>Highest Rating</MenuItem>
                    <MenuItem value={'lowest_rating'}>Lowest Rating</MenuItem>
                </Select>
            </FormControl>
            <button className={styles.reviews_addBtn} onClick={handleClickOpen}>Add Review</button>

            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                fullWidth={true}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Add a review"}</DialogTitle>
                <DialogContent>
                    <CheckBox name={'Do you recommend this places?'}/>
                    <div style={{margin: '5%'}}>
                        <Rating
                            value={5}
                            precision={0.5}
                            icon={<FavoriteIcon style={{ fontSize: '20px'}} />}
                        />
                    </div>
                    <form>
                        <textarea rows={10} placeholder={'Write review'}
                                  style={{margin: '5%', padding: '3%', borderRadius: '10px', width: '90%'}}>
                        </textarea>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" size={'small'}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ReviewsBoxOptions;