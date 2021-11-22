import {useDispatch} from 'react-redux';
import { showModalAction, hideModalAction } from '../redux/app-reducer';

export const useModal = (modalType) => {
    const dispatch = useDispatch();
    
    const showModal = (modalProps) => dispatch(showModalAction({modalType: modalType, modalProps}));

    const hideModal = () => dispatch(hideModalAction());

    return {showModal, hideModal};
};

export default useModal;
