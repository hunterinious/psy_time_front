import React from 'react';
import styles from './Footer.module.scss';

const Header = (props) => {
    return (
        <footer className={styles.Footer}>
            <div className={styles.FooterContent}>
                <div className={styles.FooterItem}>
                    <p className={styles.FooterItemTitle}>
                        Psy Time
                    </p>
                    <ul className={styles.FooterItemTitleList}>
                        <li>
                            About project
                        </li>
                    </ul>
                </div>
                <div className={styles.FooterItem}>
                    <p className={styles.FooterItemTitle}>
                        Contacts
                    </p>
                    <ul className={styles.FooterItemTitleList}>
                        <li>
                            contact@psytime.com
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Header;
