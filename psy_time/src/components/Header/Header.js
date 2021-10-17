import React from 'react';
import style from './Header.module.css';
import Navbar from '../../components/Navbar/Navbar';
import logo from '../../images/logo.png';


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
                    <Navbar {...props}/>
                </div>
            </header>
        </div>
    );
}

export default Header;
