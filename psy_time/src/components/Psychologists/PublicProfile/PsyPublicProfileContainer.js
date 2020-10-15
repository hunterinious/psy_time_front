import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getPsyPublicProfile } from '../../../redux/psy-profiles-reducer';
import styles from './PsyPublicProfile.module.css';
import PsyPublicProfile from './PsyPublicProfile';
import ExtendedProfileContainer from './ExtendedProfile/ExtendedProfileConrainer';


const POSTS = 'POSTS';
const REVIEWS = 'REVIEWS';
const EXTENDED_PROFILE = 'EXTENDED_PROFILE';


class PsyPublicProfileContainer extends Component {
    constructor(props) {
        super()
        this.state = {currentSectionId: null}
        this.renderSectionComponent = this.renderSectionComponent.bind(this)
        this.handleSectionClick = this.handleSectionClick.bind(this)
    }

    componentDidMount(){
        this.props.getPsyPublicProfile(this.props.match.params.id)
    }

    handleSectionClick = (e) => {
        const id = e.target.id
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

    renderSectionComponent(sectionId){
        switch(sectionId) {
            case POSTS:
                return 
            case REVIEWS:
                return 
            case EXTENDED_PROFILE:
                return <ExtendedProfileContainer />
          }
    }

    render() {
        let reviews_count = this.props.profile ? this.props.profile.reviews_count : null
        return (
            <div className="container">
                { this.props.profile
                    ? <>
                    <PsyPublicProfile profile={this.props.profile} />
                    <div clasName="d-flex flex-row" onClick={this.handleSectionClick}>
                        <ul className={"nav nav-tabs "} role="tablist">
                            <div className={"p-2 ml-20 " + styles.navsCustom}> 
                                <li id={POSTS} className="nav-item">
                                    Posts
                                </li>
                            </div>
                            <div className={"p-2 ml-20 " + styles.navsCustom}>
                                <li id={REVIEWS} className="nav-item ml-10">
                                Reviews
                                    <span className={styles.counter}>
                                        {reviews_count}
                                    </span>
                                </li>
                            </div>
                            <div className={"p-2 ml-20 " + styles.navsCustom}>
                                <li id={EXTENDED_PROFILE} className="nav-item ml-10">
                                More about therapists
                                </li>
                            </div>
                        </ul>
                    </div>
                 </>
                    : null
                }
                
                {this.state.currentSectionId ?
                    this.renderSectionComponent(this.state.currentSectionId)
                    : null
                }
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