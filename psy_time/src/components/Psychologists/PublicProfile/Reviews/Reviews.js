import React from 'react';
import style from './Reviews.module.css'


const Reviews = (props) => {
    return (
        <div>
            {
                props.reviews.map(elem => (
                    <div className="card">
                        <div className={"row " + style.reviewsMargin}>
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
