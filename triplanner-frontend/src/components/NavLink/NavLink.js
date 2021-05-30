import {Link, useLocation} from "react-router-dom";

const NavLink = ({route, children}) => {
    const location = useLocation();
    const pathname = location.pathname;

    const isActive = route => {
        return pathname === route ? 'active' : '';
    }

    return(
        <Link to={route} className={isActive(route)}>{children}</Link>
    );
}

export default NavLink;
