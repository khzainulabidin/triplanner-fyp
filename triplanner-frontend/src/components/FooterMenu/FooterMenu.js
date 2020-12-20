import React from "react";
import {Link} from "react-router-dom";

const FooterMenu = () => (
    <div>
        <Link to={'/'}>Home</Link>
        <Link to={'/'}>About</Link>
        <Link to={'/'}>Terms of use</Link>
        <Link to={'/'}>Privacy policy</Link>
        <Link to={'/'}>Contact</Link>
    </div>
);

export default FooterMenu;