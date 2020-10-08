import React from 'react';

const HowToChoosePsy = (props) => {

    const handleClose = () => {
        props.handleClose()
    }

    return (
        <div>
            <div>
                { props.text }
            </div>
          
            <div>
                <button className="btn btn-warning" onClick={handleClose}>
                    Choose Psychologist
                </button>
            </div>
        </div>
    )
}

export default HowToChoosePsy;
