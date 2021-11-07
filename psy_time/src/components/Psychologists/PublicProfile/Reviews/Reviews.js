import React from 'react';
import styles from './Reviews.module.scss'


const Reviews = (props) => {
    return (
        <div>
            {
                props.reviews.map(elem => (
                    <div className="card">
                        <div className={"row " + styles.reviewsMargin}>
                            <div className="col-sm-2">
                                {elem.name}
                            </div>
                            <div className="col-sm-8">
                                {elem.text}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
  
}


export default Reviews;
