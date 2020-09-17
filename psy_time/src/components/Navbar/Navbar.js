import React, { Component } from 'react';
import style from './Navbar.module.css'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={style.nav} >
            <div className={style.item}>
                <NavLink exact to="/" activeClassName={style.activeLink}>ДОМОЙ</NavLink>
            </div>
            <div className={style.item}>
                <NavLink to="/psychologists" activeClassName={style.activeLink}>ТЕРАПЕВТЫ</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;