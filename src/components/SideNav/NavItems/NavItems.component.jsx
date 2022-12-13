import React from 'react';
import NavItem from './NavItem/NavItem.component';


const screenAccessRestrictions = (auth, routes) => {
    let screens = routes.map((item, i) => (
            <NavItem path={item.path} name={item.name} icon={item.icon} key={i}/>
    ));
    switch (auth.role) {
        case 'AGENT': 
        return screens = routes.filter((route) => {
            return route.agentAccess !== false
        }).map((item, i) => (
            <NavItem path={item.path} name={item.name} icon={item.icon} key={i}/>
        ));
        case 'ADMIN': 
        return screens = routes.filter((route) => {
            return route.adminAccess !== false;
        }).map((item, i) => (
            <NavItem path={item.path} name={item.name} icon={item.icon} key={i}/>
        ));
        case 'AUDITOR': 
        return screens = routes.filter((route) => {
            return route.auditorAccess !== false;
        }).map((item, i) => (
            <NavItem path={item.path} name={item.name} icon={item.icon} key={i}/>
        ));
        default: return screens;
    };
};

const NavItems = (props) => {
    const { auth, routes  } = props;
    const navItems = screenAccessRestrictions(auth, routes);
    return (
        <div className="Sidenav__items">
            {navItems}
        </div>
    )
};

export default NavItems;
