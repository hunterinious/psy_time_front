import React from 'react';
import * as routePaths from '../../consts/route/routePaths';
import Preloader from '../Common/Preloader/Preloader';
import styles from './Navbar.module.scss';


const MyNav = (props) => {
    const {isLoginDataFetching, isLoginFailed, handleOpenModal, logoutUser} = props;

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
                        </li>
                        :
                        <li className={styles.Dropdown}>
                            <span>Profile</span>
                            <ul className={styles.DropdownContent}>
                                <li><a href={routePaths.PRIVATE_PROFILE}>Edit profile</a></li>
                                <div className={styles.DropdownContentWrapper}> </div>
                                <li><a href={routePaths.HOME} onClick={logoutUser}>Logout</a></li>
                            </ul>
                        </li>
                    : <Preloader />
                }
            </ul>
        </nav>
    );
}

export default MyNav;