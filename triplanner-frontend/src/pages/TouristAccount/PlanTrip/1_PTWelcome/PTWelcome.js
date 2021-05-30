import PlanTripLayout from "../../../../components/PlanTripLayout/PlanTripLayout";
import React from "react";

const PTWelcome = ({action, progress}) => {
    return(
        <PlanTripLayout
            title={
                <span>
                    Welcome to the <b style={{color: '#04B6A9'}}>Tri
                    <span style={{borderBottom: '2px solid #04B6A9'}}>Planner</span></b>
                </span>
            }
            description={'A smarter way to plan your trips. Click the Next button to start planning your next trip'}
            actionText={'Next'}
            action={action}
            progress={progress}
        />
    );
}

export default PTWelcome;
