import MyCard from "../MyCard/MyCard";
import {Switch} from "@material-ui/core";
import React from "react";

const MessagingFeature = ({messaging, setMessaging}) => (
    <MyCard>
        <span>
            <Switch
                checked={messaging}
                onChange={() => setMessaging(!messaging)}
                name={'messaging'}
                label={'Messaging'}
            />
            <span style={{textTransform: 'capitalize', fontSize: '90%'}}>Messaging</span>
        </span>
        <p style={{fontSize: '80%', color: 'rgba(0, 0, 0, 0.7)', margin: '1%'}}>
            You can boost your sales by enabling messaging feature and answering your customer's queries right away.
        </p>
    </MyCard>
);

export default MessagingFeature;
