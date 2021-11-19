import store from '../redux/store'
import {hideModalAction} from '../redux/app-reducer'


const hideModal = (modalType) => {
    const dispatch = store.dispatch
    dispatch(hideModalAction(modalType))
};

export default {hideModal}
