import React, {useEffect} from 'react'
import { connect } from 'react-redux'; 
import { getHowToChoosePsy }  from '../../../../redux/app-reducer';

const HowToChoosePsy = (props) => {
    const {getHowToChoosePsy, handleClose, text} = props

    useEffect(() => {
        getHowToChoosePsy()
    }, []);

    return (
        <div>
            <div>
                { text }
            </div>
        
            <div>
                <button className="btn btn-warning" onClick={handleClose}>
                    Choose Psychologist
                </button>
            </div>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        text: state.app.howToChoosePsyText
    }
}


export default connect(mapStateToProps, { getHowToChoosePsy })(HowToChoosePsy)

