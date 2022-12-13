import React from 'react';
import Banner from '../../assets/hanepbuhay/logo.png';
import NavItems from './NavItems/NavItems.component';
import { screenRoutes } from '../../routes';


const SideNav = ({ auth }) => {
    return (
        <nav className="Sidenav">
            <div>
                <a href="/"><img src={Banner} alt='banner' className="Sidenav__banner"/></a>
            </div>
            <NavItems auth={auth} routes={screenRoutes}/>
        </nav>
    )
}
export default SideNav;
