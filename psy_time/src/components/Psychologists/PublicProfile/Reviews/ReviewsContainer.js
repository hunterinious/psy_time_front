import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPsyReviews } from '../../../../redux/psy-reviews-reducer';
import Preloader from '../../../Common/Preloader/Preloader';
import Reviews from './Reviews';

class ReviewsContainer extends Component {
    componentDidMount(){
        this.props.getPsyReviews({id: this.props.paramId})
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
        reviews: state.psyReviews.reviews,
        reviewsAreFetching: state.psyReviews.reviewsAreFetching
    }
}

export default connect(mapStateToProps, { getPsyReviews })(ReviewsContainer)