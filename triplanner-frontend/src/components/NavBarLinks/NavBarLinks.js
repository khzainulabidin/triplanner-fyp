import React from "react";
import {Link} from "react-router-dom";

const NavBarLinks = () => (
    <div>
        <Link to={'/'}>Explore</Link>
        <Link to={'/account'}>Sign In</Link>
    </div>
);

export default NavBarLinks;