import React, {useState, Fragment} from "react";
import PTSummary from "../PTSummary/PTSummary";

const AdminTripsModal = ({trip}) => {
    const [open, setOpen] = useState(false);

    return(
        <Fragment>
            <p onClick={() => setOpen(true)} style={{color: '#04B6A9', cursor: 'pointer'}}>View</p>
            <div style={{textAlign: 'left'}}>
                <PTSummary open={open} setOpen={setOpen} inputs={trip} titleHidden={true}/>
            </div>
        </Fragment>
    );
}

export default AdminTripsModal;
