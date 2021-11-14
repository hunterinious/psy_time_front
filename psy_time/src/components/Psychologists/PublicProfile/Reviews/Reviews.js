import React from 'react';
import Card from '../../../Common/Card/Card';


const Reviews = (props) => {
    return (
        <>
            {
                props.reviews.map(r => (
                    <Card title={r.name} text={r.text} />
                ))
            }
        </>
    )
  
}


export default Reviews;
