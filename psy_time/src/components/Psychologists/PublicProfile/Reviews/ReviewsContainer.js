import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPsyReviews } from '../../../../redux/psy-reviews-reducer';
import Reviews from './Reviews';

class ReviewsContainer extends Component {
    componentDidMount(){
        this.props.getPsyReviews({id: this.props.paramId})
    }

    render() {
        const {reviewsAreFetching, reviews} = this.props;
        const reviewaAmount = reviews.length

        return (
            <>
            { reviewsAreFetching
                ? null
                : reviewaAmount 
                    ? <Reviews reviews={reviews} />
                    : 'This therapist doesn\'t have reviews'
            }
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        reviews: state.psyReviews.reviews,
        reviewsAreFetching: state.psyReviews.reviewsAreFetching
    }
}

export default connect(mapStateToProps, { getPsyReviews })(ReviewsContainer)