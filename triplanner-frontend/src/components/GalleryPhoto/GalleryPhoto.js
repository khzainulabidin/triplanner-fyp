import styles from './GalleryPhoto.module.css';
import React, {useState, Fragment} from "react";
import MyModal from "../MyModal/MyModal";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {Fade} from "react-reveal";

const GalleryPhoto = ({photo, deletePhoto}) => {
    const [open, setOpen] = useState(false);
    const [photoPath] = useState(`http://localhost:5000/${photo}`);

    const handleDelete = () => {
        deletePhoto(photo);
    }

    return(
        <Fragment>
            <div>
                {deletePhoto && <div className={styles.delete} onClick={handleDelete}>
                    <DeleteOutlineIcon fontSize={'small'}/>
                </div>}
                <Fade><img src={photoPath} alt={'Gallery'} className={styles.galleryImg} onClick={() => setOpen(true)}/></Fade>
            </div>
            <MyModal open={open} setOpen={setOpen} buttonsHidden={true}>
                <img src={photoPath} alt={'Gallery'} className={styles.preview}/>
            </MyModal>
        </Fragment>
    );
}

export default GalleryPhoto;
