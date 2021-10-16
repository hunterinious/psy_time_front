import React from 'react';
import style from './Header.module.css';
import Navbar from '../../components/Navbar/Navbar';
import logo from '../../images/logo.png';
import LoginContainer from '../Authentication/Login/Login';
import { Link } from 'react-router-dom';
import * as routePaths from '../../consts/routePaths';

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
                    { !props.isLoginDataFetching
                        ? props.isLoginFailed
                            ?
                            <div>
                                <div onClick={props.handleOpenModal}>Login</div>
                                { props.showModal ? <LoginContainer modal={true} handleClose={props.handleCloseModal} /> : null }
                            </div>
                            :
                            <Link to={routePaths.PRIVATE_PROFILE}>Profile</Link>
                        : null
                    }
                </div>
            </header>
        </div>
    );
}

export default Header;
