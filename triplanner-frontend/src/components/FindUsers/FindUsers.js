import styles from './FindUsers.module.css';
import React, {useEffect, useState} from "react";
import {Fade} from "react-reveal";

const FindUsers = ({array, action}) => {
    const [usernameInput, setUsernameInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleAction = username => {
        setUsernameInput('');
        action(username);
    }

    useEffect(() => {
        if (usernameInput.length > 0 && array && array.length > 0){
            let regex = new RegExp(`^${usernameInput.toLowerCase()}.*`);
            const newSuggestions = array.filter(element => element.username.match(regex)).slice(0, 3);
            setSuggestions(newSuggestions);
        }
        else {
            setSuggestions([]);
        }
        //eslint-disable-next-line
    }, [usernameInput, array]);

    return(
        <div className={styles.container}>
            <input
                type={'text'}
                className={styles.findUserInput}
                placeholder={'Type username'}
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
            />
            <Fade>
                <div className={styles.suggestionsBox}>
                    {suggestions.length > 0 && suggestions.map((suggestion, index) => <Fade key={index}><span onClick={() => handleAction(suggestion.username)}>{suggestion.username}</span></Fade>)}
                    {suggestions.length === 0 && usernameInput.length > 0 && <Fade><p>No suggestions</p></Fade>}
                </div>
            </Fade>
        </div>
    );
}

export default FindUsers;
