import React from 'react';
import * as routePaths from '../../consts/route/routePaths';
import LoginContainer from '../Authentication/Login/Login';
import styles from './Navbar.module.scss';


const MyNav = (props) => {
    const {isLoginDataFetching, isLoginFailed, showModal, handleOpenModal, handleCloseModal, logoutUser} = props;

    return (
        <nav className={styles.Navbar}>
            <ul className={styles.NavbarList}>
                <li><a href={routePaths.HOME}>Home</a></li>
                <li><a href={routePaths.PSYCHOLOGISTS}>Therapists</a> </li>
                {!isLoginDataFetching
                    ? isLoginFailed
                        ?
                        <li>
                            <span onClick={handleOpenModal}>Login</span>
                            { showModal ? <LoginContainer modal={true} handleClose={handleCloseModal} /> : null }
                        </li>
                        :
                        <li className={styles.Dropdown}>
                            <span>Profile</span>
                            <ul className={styles.DropdownContent}>
                                <li><a href={routePaths.PRIVATE_PROFILE}>Edit profile</a></li>
                                <div className={styles.DropdownContentWrapper}> </div>
                                <li><a href={routePaths.PRIVATE_PROFILE} onClick={logoutUser}>Logout</a></li>
                            </ul>
                        </li>
                    : null
                }
            </ul>
        </nav>
    );
}

export default MyNav;