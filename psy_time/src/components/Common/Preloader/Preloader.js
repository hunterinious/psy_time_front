import React from 'react';
import Loader from "react-loader-spinner";
import styles from './Preloader.module.scss';

const Preloader = () => {
    return (
        <div className={styles.Preloader}>
           <Loader
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={30000}
            />
        </div>
    );
};

export default Preloader;