import React, { Component } from 'react';
import style from './Home.module.css';
import mainImage from '../../images/main.jpg';

const Home = (props) => {
   
    return (
        <div className="container">
            <div className={"d-flex p-2 justify-content-center"}>
                <h2 className={style.sloganHeader}>
                    <span> СОЗДАТЕЛИ</span>
                    <span className={style.textPart}> ЩАСТЬЯ </span>
                </h2>
            </div>
            <div className={style.mainImageBlock}>
                <img className={style.mainImage} src={mainImage} />
            </div>
        </div>
    )
  
}

export default Home;
