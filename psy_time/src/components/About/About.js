import React, {useEffect} from 'react'
import { connect } from 'react-redux'; 
import { getAboutText}  from '../../redux/app-reducer';
import styles from './About.module.scss';

const About = (props) => {
    const {getAboutText, text} = props

    useEffect(() => {
        getAboutText()
    }, []);

    return (
        <div className={styles.AboutPage}>
            <div className={styles.AboutText}>
                { text }
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        text: state.app.aboutText
    }
}


export default connect(mapStateToProps, { getAboutText })(About)
