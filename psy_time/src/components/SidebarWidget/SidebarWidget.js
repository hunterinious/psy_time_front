import React from 'react';
import cn from 'classnames';
import styles from './SidebarWidget.module.scss';

const SidebarWidget = (props) => {
    const {className, onClick} = props;
    let sidebarWidgetClassName = className ? cn(styles.SidebarWidget, className) : styles.SidebarWidget
   

    return (
        <div className={sidebarWidgetClassName} onClick={onClick}>
            <div className={styles.SidebarWidgetItem}></div>
        </div>
    );
};

export default SidebarWidget;