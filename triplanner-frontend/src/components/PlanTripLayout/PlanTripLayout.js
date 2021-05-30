import styles from './PlanTripLayout.module.css';
import CloseIcon from "@material-ui/icons/Close";
import React, {useState, Fragment} from "react";
import MyModal from "../MyModal/MyModal";
import {useHistory} from "react-router-dom";
import { LinearProgress } from '@material-ui/core';
import {Fade} from "react-reveal";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PTSummary from "../PTSummary/PTSummary";

const PlanTripLayout = ({actionText, action, title, description, progress, clickBack, actionDisabled, error, setError, skippable, skipAction, inputs, children}) => {
    const [closeModalOpen, setCloseModalOpen] = useState(false);
    const [openSummary, setOpenSummary] = useState(false);

    const history = useHistory();

    const discardPlan = () => {
        setCloseModalOpen(false);
        history.push('/dashboard');
    }

    return(
        <Fade>
            <div className={styles.planTripLayout}>
                <Fragment>
                    <LinearProgress value={progress} valueBuffer={100-progress} color={'secondary'} variant={'buffer'}/>
                    <CloseIcon className={styles.closeIcon} onClick={() => setCloseModalOpen(true)}/>
                    {progress > 10 && <ArrowBackIcon className={styles.backIcon} onClick={clickBack}/>}
                    {progress > 20 && inputs && <FormatListBulletedIcon className={[styles.closeIcon, styles.summaryIcon].join(' ')} onClick={() => setOpenSummary(true)}/>}

                    <MyModal open={closeModalOpen} setOpen={setCloseModalOpen} actionText={'Discard plan'} action={discardPlan}>
                        <h4 className={styles.modalHeading}>Are you sure want to cancel?</h4>
                        <p>All the plan related information will be discarded and you will have to start over again.</p>
                    </MyModal>

                    <MyModal open={error} setOpen={() => setError('')} buttonsHidden>
                        <h4 className={styles.modalHeading}>Ah, we got an error</h4>
                        <p className={styles.modalError}>{error}</p>
                    </MyModal>

                    <button className={styles.actionButton} onClick={action} disabled={actionDisabled}>{actionText}</button>
                    {skippable && <button className={[styles.actionButton, styles.skipButton].join(' ')} onClick={skipAction}>Skip</button>}

                    {inputs && <PTSummary open={openSummary} setOpen={setOpenSummary} inputs={inputs}/>}
                </Fragment>

                <div className={styles.content}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.description}>{description}</p>
                    {children}
                </div>

            </div>
        </Fade>
    );
}

export default PlanTripLayout;
