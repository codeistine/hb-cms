import React from 'react';
import { NavLink } from 'react-router-dom';

const NavItem = ({ path, name, icon }) => {
    return (
        <NavLink to={path} className="Sidenav__item" activeClassName="Sidenav__item--active">
            {icon}
            {name}
        </NavLink>
    )
};

export default NavItem;
