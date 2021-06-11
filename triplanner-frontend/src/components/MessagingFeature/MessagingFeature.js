import MyCard from "../MyCard/MyCard";
import {Switch} from "@material-ui/core";
import React from "react";

const MessagingFeature = ({messaging, setMessaging, title, desc}) => (
    <MyCard>
        <span>
            <Switch
                checked={messaging}
                onChange={() => setMessaging(!messaging)}
                name={'messaging'}
                label={'Messaging'}
            />
            <span style={{textTransform: 'capitalize', fontSize: '90%'}}>{title}</span>
        </span>
        <p style={{fontSize: '80%', color: 'rgba(0, 0, 0, 0.7)', margin: '1%'}}>
            {desc}
        </p>
    </MyCard>
);

export default MessagingFeature;
