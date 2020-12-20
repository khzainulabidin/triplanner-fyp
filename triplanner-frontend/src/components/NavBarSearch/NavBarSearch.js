import React from "react";
import styles from "../NavBar/NavBar.module.css";
import {InputBase} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const NavBarSearch = () => (
    <div className={styles.navBar_searchBar}>
        <InputBase
            placeholder={'Search'}
            style={{width: '100%'}}
        />
        <SearchIcon style={{color: 'rgba(0, 0, 0, 0.6)'}}/>
    </div>
);

export default NavBarSearch;