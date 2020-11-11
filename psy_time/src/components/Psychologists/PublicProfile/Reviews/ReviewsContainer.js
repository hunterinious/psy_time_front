import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getPsyReviews } from '../../../../redux/psy-profiles-reducer';
import Preloader from '../../../Common/Preloader/Preloader';
import Reviews from './Reviews';

class ReviewsContainer extends Component {
    componentDidMount(){
        this.props.getPsyReviews(this.props.paramId)
    }

    render() {
        return (
            <>
            { this.props.reviewsAreFetching
                ? <Preloader />
                : <Reviews reviews={this.props.reviews} />
            }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        reviews: state.psychologistsPage.reviews,
        reviewsAreFetching: state.psychologistsPage.reviewsAreFetching
    }
}

export default compose(
    connect(mapStateToProps, { getPsyReviews }),
)(ReviewsContainer)