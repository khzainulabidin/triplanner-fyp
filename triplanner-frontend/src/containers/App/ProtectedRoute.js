import React, {useState, useEffect, Fragment} from "react";
import {Route, Redirect} from "react-router-dom";
import {isAuthenticated} from "../../utils/auth";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ProtectedRoute = ({path, component, exact, type}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const authenticate = async () => {
        try {
            setIsLoading(true);
            const res = await isAuthenticated(type);
            setAuthenticated(res);
        }
        catch (e){
            setIsLoading(false);
            setAuthenticated(false);
        }
    }

    useEffect(() => {
        authenticate().then(() => {
            setIsLoading(false);
        });
        //eslint-disable-next-line
    }, []);

    return(
        <Fragment>
            <LoadingSpinner isLoading={isLoading}/>
            {isLoading ? null : authenticated ? <Route path={path} component={component} exact={exact}/> : <Redirect to={'/account/signIn'}/>}
        </Fragment>
    );
}

export default ProtectedRoute;
