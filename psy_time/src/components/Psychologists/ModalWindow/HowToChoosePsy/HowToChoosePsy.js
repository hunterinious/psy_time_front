import React, {useEffect} from 'react'
import { connect } from 'react-redux'; 
import { getHowToChoosePsy }  from '../../../../redux/app-reducer';
import Button from '../../../Common/Buttons/Button/Button';
import styles from './HowToChoosePsy.module.scss';

const HowToChoosePsy = (props) => {
    const {getHowToChoosePsy, handleClose, text} = props

    useEffect(() => {
        getHowToChoosePsy()
    }, []);

    return (
        <div className={styles.HowToChoosePsy}>
            <div className={styles.HowToChoosePsyText}>
                { text }
            </div>
            <Button className={styles.HowToChoosePsyButton} onClick={handleClose}>
                Choose Psychologist
            </Button>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        text: state.app.howToChoosePsyText
    }
}


export default connect(mapStateToProps, { getHowToChoosePsy })(HowToChoosePsy)

