import React, { Component } from 'react';
import style from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import logo from '../../images/logo.png'

const Header = (props) => {
    return (
        <div className="container">
            <header className={"d-flex p-2 justify-content-between"}>
                <nav>
                    <div>
                        <img src={logo}/>
                    </div>
                </nav>
                <div className={style.menu}>
                    <Navbar />
                </div>
                <div className={style.loginBlock}>
                    { props.isAuth
                        ? <div> { props.username } <button onClick={props.logout}>Log out</button></div>
                        : <div>
                            <div> <NavLink to={'/login'}>
                                <h2> Л<span className={style.textPart}>О</span>ГИН</h2>
                                </NavLink>
                            </div>
                        </div> }
                </div>
            </header>
        </div>
    );
}

export default Header;
