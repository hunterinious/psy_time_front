import React, { Component } from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { Modal} from 'react-bootstrap';
import {setShowSidebar} from '../../redux/app-reducer';
import { getPsyUsersProfiles } from '../../redux/psy-profiles-reducer';
import Preloader from '../Common/Preloader/Preloader';
import CloseButton from '../Common/Buttons/CloseButton/CloseButton';
import SidebarWidget from '../SidebarWidget/SidebarWidget';
import Pagination from '../Pagination/Pagination';
import PsyShortProfile from './PsyShortProfile';
import CriteriaPsyContainer from './ModalWindow/CriteriaPsy/CriteriaPsyContainer';
import HowToChoosePsy from './ModalWindow/HowToChoosePsy/HowToChoosePsy';
import RandomPsyContainer from './ModalWindow/RandomPsy/RandomPsyContainer';
import HelpContainer from '../Help/HelpContainer';
import layoutService from '../../services/layoutService';
import styles from './Psychologists.module.scss';


const HOW_TO_CHOOSE_PSY = 'HOW_TO_CHOOSE_PSY';
const CRITERIA_PSY = 'CRITERIA_PSY'
const RANDOM_PSY = 'RANDOM_PSY';
const HELP = 'HELP';


class PsyProfilesContainer extends Component {
    constructor(props) {
        super()
        this.state = {
            showModal: false,
            currentSectionId: null,
            modalHeaderText: '',
        }
    }

    componentDidMount() {
        this.props.getPsyUsersProfiles({pageNumber: 1})
        this.props.setShowSidebar()
    }

    getModalHeaderText(id) {
        let text = ''

        switch(id) {
            case HOW_TO_CHOOSE_PSY:
                text = 'How To Choose Therapist'
                break;
            case  RANDOM_PSY:
                text = 'Random Therapist'
                break;
            case HELP:
                text = 'Help in choosing'
                break;
            case CRITERIA_PSY:
                text = 'Filtering'
                break;
        }

        return text
    }

    handleOpenModal = (e) => {
        console.log(e.target, 'target')
        const id = e.target.id || e.target.parentNode.id
        const text = this.getModalHeaderText(id)

        this.setState({
            showModal: true,
            currentSectionId: id,
            modalHeaderText: text
        })
    }

    handleClose = () => {
        this.setState({showModal: false})
    }

    handleSidebarOpenClose = () => {
        this.props.setShowSidebar()
    }

    renderModalWindowComponent = (sectionId) => {
        switch(sectionId) {
            case HOW_TO_CHOOSE_PSY:
                return <HowToChoosePsy handleClose={this.handleClose}/>
            case RANDOM_PSY:
                return <RandomPsyContainer/>
            case HELP:
                return <HelpContainer handleClose={this.handleClose}/>
            case CRITERIA_PSY:
                return <CriteriaPsyContainer handleClose={this.handleClose}/>
          }
    }

    render() {
        const {layoutType, showSidebar, profiles, profilesPagesAmount,
            profilesAreFetching, profilesNotFound, getPsyUsersProfiles} = this.props

        const {showModal, modalHeaderText, currentSectionId} = this.state
    
        const isMobileLayout = layoutService.isMobileLayout(layoutType)

        const sidebarClassName = showSidebar
            ? styles.ProfilesSidebar
            : cn(styles.ProfilesSidebar, styles.ProfilesSidebarHide)

        const psyProfilesContainerClassName = showSidebar
            ? cn(styles.PsyProfilesContainer, styles.PsyProfilesContainerWithSidebar)
            : styles.PsyProfilesContainer


        const modalClassName = currentSectionId === HOW_TO_CHOOSE_PSY
             ? cn(styles.PsyProfilesModal, styles.PsyProfilesModalExtra) : styles.PsyProfilesModal

        return <div className={styles.ProfilesPageContainer}>
            {profilesAreFetching ? <Preloader /> : null}
            <div className={styles.ProfilesPage}>
                {!isMobileLayout &&
                    <SidebarWidget
                        onClick={this.handleSidebarOpenClose}
                    />
                }
                <div className={sidebarClassName}>
                    <CloseButton onClick={this.handleSidebarOpenClose} />
                    <ul id={currentSectionId} className={styles.ProfilesSidebarList} onClick={this.handleOpenModal}>
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
                <div className={psyProfilesContainerClassName}>
                    {profilesNotFound
                        ? <p>Nothing found matching your criteria</p>
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
                                key={p.id} />)
                            }
                        </div>
                    }
                </div>
            </div>

           {profilesPagesAmount &&
                <Pagination 
                    pagesAmount={profilesPagesAmount}
                    getPageData={getPsyUsersProfiles}
                    needScrollToTop
                />
           }

            <Modal size="lg" show={showModal} onHide={this.handleClose} animation={false} contentClassName={modalClassName}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalHeaderText}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { this.renderModalWindowComponent(currentSectionId) }
                </Modal.Body>
            </Modal>
        </div>
    }
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


