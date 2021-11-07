import React from 'react';
import { connect } from 'react-redux';
import appRouterService from '../../services/appRouterService';
import layoutService from '../../services/layoutService';
import Button from '../Button/Button';
import IntroImage from '../Images/IntroImage';
import styles from './Home.module.scss';


const Home = (props) => {
    const {layoutType} = props
    const isDesktopLayout = layoutService.isDesktopLayout(layoutType)

    const onChoosePsyClick = () => {
        appRouterService.forwardToPsychologistsPage()
    }

    return (
        <div className={styles.HomePage}>
            <div className={styles.IntroBlock}>
                <div className={styles.IntroBlockText}>
                    <p className={styles.IntroBlockMainText}>
                        Find a therapist for your needs
                    </p>
                    <p className={styles.IntroBlockAdditionalText}>
                        Consultation from anywhere in the world, large selection of therapists
                    </p>
                    <Button className={styles.Button} onClick={onChoosePsyClick}>
                        Choose a therapist
                    </Button>
                </div>
                { isDesktopLayout 
                    ?
                    <div className={styles.IntroBlockImage} arria-hidden={true}>
                        <IntroImage/>
                    </div>
                    : null
                }
            </div>
            <div className={styles.AdvantagesBlock}>
                <p className={styles.AdvantagesBlockTitle}>
                    Our service advanatages
                </p>
                <div className={styles.Advantages}>
                    <Advatage 
                        title={'Highly qualified specialists'}
                        description={'Only 20 % of our therapists are screened'}
                        number={1}
                    />
                    <Advatage 
                        title={'Large selection of  therapists'}
                        description={'100+ therapists in the database'}
                        number={2}
                    />
                    <Advatage 
                        title={'High level of confidentiality'}
                        description={'The application uses personal data solely for the best selection of the therapist'}
                        number={3}
                    />
                </div>
            </div>
        </div>       
    )
}

const Advatage = (props) => {
    const {number, title, description} = props

    return (
        <div className={styles.Advantage}>
            <div className={styles.AdvantageCircle}>
                <span className={styles.AdvantageCircleText}>{number}</span>
            </div>
            <p className={styles.AdvantageTitle}>
                {title}
            </p>
            <p className={styles.AdvantageDescription}>
                {description}
            </p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    layoutType: state.app.layoutType
})


export default connect(mapStateToProps, {})(Home);
