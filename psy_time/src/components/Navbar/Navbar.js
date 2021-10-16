import React from 'react';
import style from './Navbar.module.css'
import { NavLink } from 'react-router-dom';
import * as routePaths from '../../consts/routePaths';


const Navbar = () => {
    return (
        <nav className={style.nav} >
            <div className={style.item}>
                <NavLink exact to={routePaths.HOME} activeClassName={style.activeLink}>Home</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to={routePaths.PSYCHOLOGISTS} activeClassName={style.activeLink}>Psychologists</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;