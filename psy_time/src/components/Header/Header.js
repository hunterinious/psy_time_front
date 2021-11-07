import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import styles from './Header.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import SlidingMenu from '../SlidingMenu/SlidingMenu';
import layoutService from '../../services/layoutService';



const Header = (props) => {
    const {layoutType, isLoginFailed, isLoginDataFetching, logoutUser} = props
    const isMobileLayout = layoutService.isMobileLayout(layoutType)
    const [isScrolled, setIsScrolled] = useState(false)

    const listenScrollEvent = e => {
        if(window.scrollY > 0){
            setIsScrolled(true)
        }else{
            setIsScrolled(false)
        }
    }
    
    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
    }, []);


    
    const headerContainerClassName = isScrolled
        ? cn(styles.HeaderContainer, styles.OnScroll)
        : styles.HeaderContainer


    return (
        <div className={headerContainerClassName}>
            <header className={styles.Header}>
                <div className={styles.LogoContainer}>
                    <span className={styles.Logo}>
                        Psy Time
                    </span>
                </div>
                {isMobileLayout
                    ? 
                    <SlidingMenu
                        layoutType={layoutType}
                        isLoginDataFetching={isLoginDataFetching}
                        isLoginFailed={isLoginFailed}
                        logoutUser={logoutUser}
                    />
                    : <Navbar {...props}/>
                }  
            </header>
        </div>
    );
}

export default Header;
