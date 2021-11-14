import React, { useState } from 'react';
import cn from 'classnames';
import * as routePaths from '../../consts/route/routePaths';
import appRouterService from '../../services/appRouterService';
import CloseButton from '../Common/Buttons/CloseButton/CloseButton';
import styles from './SlidingMenu.module.scss';


const SlidingMenu = (props) => {
    const {isLoginDataFetching, isLoginFailed, logoutUser} = props;
    const [isSlidingMenuShown, setIsSlidingMenuShown] = useState(false)
    const [isDropdownContentVisible, setIsDropdownContentVisible] = useState(false)

    const onWidgetClick = () => {
        setIsSlidingMenuShown(!isSlidingMenuShown)
        setIsDropdownContentVisible(false)
    }

    const onLoginClick = () => {
        setIsSlidingMenuShown(!isSlidingMenuShown)
        appRouterService.forwardToLoginPage()
    }

    const onDropdownClick = () => {
        setIsDropdownContentVisible(!isDropdownContentVisible)
    }

    const dropdownContentClassName = isDropdownContentVisible 
        ? cn(styles.DropdownContent, styles.DropdownContentVisible)
        : styles.DropdownContent
    
    
    const slidingMenuClassName = isSlidingMenuShown
        ? cn(styles.SlidingMenu, styles.SlidingMenuActive)
        : styles.SlidingMenu

    return (
        <>
            <div className={styles.SlidingMenuWidget} onClick={onWidgetClick}>
                <div className={styles.SlidingMenuWidgetItem}></div>
                <div className={styles.SlidingMenuWidgetItem}></div>
                <div className={styles.SlidingMenuWidgetItem}></div>
            </div>
          
            <nav className={slidingMenuClassName}>
                <CloseButton onClick={onWidgetClick} />
                <ul className={styles.DropdownList}>
                    <li><a href={routePaths.HOME}>Home</a></li>
                    <li><a href={routePaths.PSYCHOLOGISTS}>Therapists</a></li>
                    {!isLoginDataFetching
                        ? isLoginFailed
                            ?
                            <li>
                                <span onClick={onLoginClick}>Login</span>
                            </li>
                            :
                            <li className={styles.Dropdown} onClick={onDropdownClick}>
                                <span>Profile</span>
                                <ul className={dropdownContentClassName}>
                                    <li><a href={routePaths.PRIVATE_PROFILE}>Edit profile</a></li>
                                    <div className={styles.DropdownContentWrapper}> </div>
                                    <li><a href={routePaths.PRIVATE_PROFILE} onClick={logoutUser}>Logout</a></li>
                                </ul>
                            </li>
                        : null
                    }
                </ul>
            </nav>
        </>
    );
};


export default SlidingMenu;