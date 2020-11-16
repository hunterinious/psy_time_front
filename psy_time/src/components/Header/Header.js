import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import style from './Header.module.css';
import Navbar from '../../components/Navbar/Navbar';
import logo from '../../images/logo.png';
import LoginContainer from '../Authentication/Login/Login';

const Header = (props) => {
    const [show, setShow] = useState(false)

    const handleOpen = () => {
        if(props.location.pathname !== '/login'){
            setShow(true)
        }
    }

    const handleClose = () => {
        setShow(false)
    }

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
                            <div onClick={handleOpen}>Login</div>
                            { show ? <LoginContainer modal={true} handleClose={handleClose} />: null }
                        </div> }
                </div>
            </header>
        </div>
    );
}

export default compose(withRouter)(Header);
