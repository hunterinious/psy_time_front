import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import style from './Header.module.css';
import Navbar from '../../components/Navbar/Navbar';
import logo from '../../images/logo.png';
import LoginContainer from '../Authentication/Login/Login';

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
                        ? <div><button onClick={props.logout}>Log out</button></div>
                        : <div>
                            <div onClick={props.handleOpenModal}>Login</div>
                            { props.showModal ? <LoginContainer modal={true} handleClose={props.handleCloseModal} />: null }
                        </div> }
                </div>
            </header>
        </div>
    );
}

export default compose(withRouter)(Header);
