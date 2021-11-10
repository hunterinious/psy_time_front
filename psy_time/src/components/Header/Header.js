import React from 'react';
import styles from './Header.module.scss';
import Navbar from '../../components/Navbar/Navbar';
import SlidingMenu from '../SlidingMenu/SlidingMenu';
import SidebarWidget from '../SidebarWidget/SidebarWidget';
import layoutService from '../../services/layoutService';



const Header = (props) => {
    const {layoutType, showSidebarWidget, setShowSidebar, isLoginFailed,
        isLoginDataFetching, logoutUser} = props
    const isMobileLayout = layoutService.isMobileLayout(layoutType)


    return (
        <div className={styles.HeaderContainer}>
            <header className={styles.Header}>
                <div className={styles.LogoContainer}>
                    <span className={styles.Logo}>
                        Psy Time
                    </span>
                </div>
                {isMobileLayout
                    ? 
                    <div className={styles.HeaderNavigationWrapper}>
                        {showSidebarWidget && 
                            <SidebarWidget
                                onClick={setShowSidebar}
                            />
                        }
                        <SlidingMenu
                            layoutType={layoutType}
                            isLoginDataFetching={isLoginDataFetching}
                            isLoginFailed={isLoginFailed}
                            logoutUser={logoutUser}
                        />
                    </div>
                    : <Navbar {...props}/>
                }  
            </header>
        </div>
    );
}

export default Header;
