import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { useModal } from '../../hooks/useModal';
import {setShowSidebar} from '../../redux/app-reducer';
import { getPsyUsersProfiles } from '../../redux/psy-profiles-reducer';
import modalTypes from '../../consts/app/modalTypes';
import CloseButton from '../Common/Buttons/CloseButton/CloseButton';
import SidebarWidget from '../SidebarWidget/SidebarWidget';
import Pagination from '../Common/Pagination/Pagination';
import PsyShortProfile from './PsyShortProfile';
import layoutService from '../../services/layoutService';
import styles from './Psychologists.module.scss';
import Preloader from '../Common/Preloader/Preloader';


const HOW_TO_CHOOSE_PSY = 'HOW_TO_CHOOSE_PSY';
const CRITERIA_PSY = 'CRITERIA_PSY'
const RANDOM_PSY = 'RANDOM_PSY';
const HELP = 'HELP';


const PsyProfilesContainer = (props) => {
    const {showModal: showAppointmentModal} = useModal(modalTypes.APPOINTMENT_MODAL)
    const {showModal: showHowToChoosePsyModal} = useModal(modalTypes.HOW_TO_CHOOSE_PSY_MODAL)
    const {showModal: showRandomPsyModal} = useModal(modalTypes.RANDOM_PSY_MODAL)
    const {showModal: showHelpModal} = useModal(modalTypes.HELP_MODAL)
    const {showModal: showCriteriaPsyModal} = useModal(modalTypes.CRITERIA_PSY_MODAL)
    const [currentSectionId, setCurrentSectionid] = useState(null)

    useEffect(() => {
        props.getPsyUsersProfiles({pageNumber: 1})
    }, []);
    

    const handleOpenModal = (e) => {
        const id = e.target.id || e.target.parentNode.id

        const modalContentClassName = id === HOW_TO_CHOOSE_PSY
            ? styles.PsyProfilesModalExtra : ''

        switch(id) {
            case HOW_TO_CHOOSE_PSY:
                showHowToChoosePsyModal({contentClassName: modalContentClassName})
                break
            case RANDOM_PSY:
                showRandomPsyModal({contentClassName: modalContentClassName})
                break
            case HELP:
                showHelpModal({contentClassName: modalContentClassName})
                break
            case CRITERIA_PSY:
                showCriteriaPsyModal({contentClassName: modalContentClassName})
                break
            default:
                break
          }
          
        setCurrentSectionid(id)
    }

    const handleSidebarOpenClose = () => {
        props.setShowSidebar()
    }

   
    const {layoutType, showSidebar, profiles, profilesPagesAmount,
        profilesAreFetching, profilesNotFound, getPsyUsersProfiles} = props


    const isMobileLayout = layoutService.isMobileLayout(layoutType)

    const sidebarClassName = showSidebar
        ? styles.ProfilesSidebar
        : cn(styles.ProfilesSidebar, styles.ProfilesSidebarHide)


    return (
        <div className={styles.ProfilesPageContainer}>
            <div className={styles.ProfilesPage}>
                {!isMobileLayout && 
                    <SidebarWidget
                        onClick={handleSidebarOpenClose}
                    />
                }
                <div className={sidebarClassName}>
                    <CloseButton onClick={handleSidebarOpenClose} />
                    <ul id={currentSectionId} className={styles.ProfilesSidebarList} onClick={handleOpenModal}>
                        <li id={HOW_TO_CHOOSE_PSY} className={styles.ProfilesSidebarListItem}>
                            <a>How to choose Therapist</a>
                        </li>
                        <li id={RANDOM_PSY} className={styles.ProfilesSidebarListItem}>
                            <a>Random Therapist</a>
                        </li>
                        <li id={HELP} className={styles.ProfilesSidebarListItem}>
                            <a>Help in Choosing</a>
                        </li>
                        <li id={CRITERIA_PSY } className={styles.ProfilesSidebarListItem}>
                            <a>Filter</a>
                        </li>
                    </ul>
                </div>
                <div className={styles.PsyProfilesContainer}>
                    {profilesNotFound
                        ? <p>Nothing found matching your criteria</p>
                        : profilesAreFetching
                            ? <Preloader />
                            :
                            <div className={styles.PsyProfiles}>
                                { profiles.map(p => <PsyShortProfile 
                                    id={p.id}
                                    avatar={p.avatar}
                                    price={p.price}
                                    duration={p.duration}
                                    statuses={p.statuses}
                                    themes={p.themes}
                                    name={p.name}
                                    key={p.id}
                                    showAppointmentModal={showAppointmentModal} />)
                                }
                            </div>
                    }
                </div>
            </div>

            {profilesPagesAmount > 0 && !profilesNotFound &&
                    <Pagination 
                        pagesAmount={profilesPagesAmount}
                        getPageData={getPsyUsersProfiles}
                        needScrollToTop
                    />
            }
                
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        layoutType: state.app.layoutType,
        showSidebar: state.app.showSidebar,
        profiles: state.psychologistsPage.profiles,
        profilesPagesAmount: state.psychologistsPage.profilesPagesAmount,
        profilesAreFetching: state.psychologistsPage.profilesAreFetching,
        profilesNotFound: state.psychologistsPage.profilesNotFound,
    }
}

export default connect(mapStateToProps, {getPsyUsersProfiles, setShowSidebar})(PsyProfilesContainer)


