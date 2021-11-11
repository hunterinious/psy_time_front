import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getPsyPublicProfile } from '../../../redux/psy-profiles-reducer';
import styles from './PsyPublicProfile.module.scss';
import PsyPublicProfile from './PsyPublicProfile';
import ExtendedProfileContainer from './ExtendedProfile/ExtendedProfileContainer';
import ReviewsContainer from './Reviews/ReviewsContainer';


const POSTS = 'POSTS';
const REVIEWS = 'REVIEWS';
const EXTENDED_PROFILE = 'EXTENDED_PROFILE';


class PsyPublicProfileContainer extends Component {
    constructor(props) {
        super()
        this.state = {currentSectionId: null}
    }

    componentDidMount(){
        const {getPsyPublicProfile, match} = this.props
        getPsyPublicProfile({id: match.params.publicProfileId})
    }

    handleSectionClick = (e) => {
        const target = e.target
        const id = target.id || target.firstChild?.id || target.closest('li')?.id
  
        if(id === this.state.currentSectionId){
            this.setState({
                currentSectionId: null,
            })
        }
        else{
            this.setState({
                currentSectionId: id,
            })
        }
    }

    renderSectionComponent = (sectionId) => {
        const paramId = this.props.match.params.publicProfileId

        switch(sectionId) {
            case POSTS:
                return 
            case REVIEWS:
                return <ReviewsContainer paramId={paramId}/>
            case EXTENDED_PROFILE:
                return <ExtendedProfileContainer paramId={paramId} />
          }
    }

    render() {
        const currentSectionId = this.currentSectionId
        const profile = this.props.profile
        let reviews_count = profile ? profile.reviews_count : null
        return (
            <div className={styles.PsyPublicProfilePage}>
                { profile
                    ? <>
                    <PsyPublicProfile profile={profile} />
                    <div id={currentSectionId} className={styles.PsyPublicProfileNav} onClick={this.handleSectionClick}>
                        <ul className={styles.PsyPublicProfileNavList} role="tablist">
                            <div className={styles.PsyPublicProfileNavListItem}>
                                <li id={REVIEWS} className="">
                                    Reviews
                                    <span>
                                        {reviews_count}
                                    </span>
                                </li>
                            </div>
                            <div className={styles.PsyPublicProfileNavListItem}>
                                <li id={EXTENDED_PROFILE} className="">
                                    More about therapists
                                </li>
                            </div>
                        </ul>
                    </div>
                 </>
                    : null
                }
                <div className={styles.PsyPublicProfileSectionWrapper}>
                    {this.state.currentSectionId && this.renderSectionComponent(this.state.currentSectionId)}
                </div>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        profile: state.psychologistsPage.publicProfile,
    }
}

export default compose(
    connect(mapStateToProps, { getPsyPublicProfile }),
    withRouter
)(PsyPublicProfileContainer)