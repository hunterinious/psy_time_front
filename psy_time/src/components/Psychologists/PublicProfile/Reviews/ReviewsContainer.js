import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPsyReviews, createPsyReview, updatePsyReview, deletePsyReview } from '../../../../redux/psy-reviews-reducer';
import Preloader from '../../../Common/Preloader/Preloader';
import Reviews from './Reviews';

class ReviewsContainer extends Component {
    componentDidMount(){
        this.props.getPsyReviews({id: this.props.publicProfileId})
    }

    createReview = (data, onSuccess, onFail) => {
        const {userProfileId, publicProfileId, createPsyReview} = this.props
        const {text} = data
        createPsyReview({text, userProfileId, publicProfileId}, onSuccess, onFail)
    }

    updateReview = (data, onSuccess, onFail) => {
        this.props.updatePsyReview(data, onSuccess, onFail)
    }

    deleteReview = (data, onSuccess, onFail) => {
        this.props.deletePsyReview(data, onSuccess, onFail)
    }

    render() {
        const {reviewsAreFetching, reviews, userId} = this.props;
        const reviewsAmount = reviews.length

        return (
            <>
            { reviewsAreFetching
                ? <Preloader />
                : reviewsAmount 
                    ? <Reviews 
                        reviews={reviews}
                        createReview={this.createReview}
                        updateReview={this.updateReview}
                        deleteReview={this.deleteReview}
                        userId={userId}/>
                    : 'This therapist doesn\'t have reviews'
            }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        userProfileId: state.auth.userProfileId,
        reviews: state.psyReviews.reviews,
        reviewsAreFetching: state.psyReviews.reviewsAreFetching
    }
}

export default connect(
    mapStateToProps,
    {getPsyReviews, createPsyReview, updatePsyReview, deletePsyReview}
)(ReviewsContainer)