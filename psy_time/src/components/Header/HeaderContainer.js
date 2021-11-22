import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import * as routePaths from '../../consts/route/routePaths';
import {setShowSidebar} from '../../redux/app-reducer';
import { getUserLoginData, logoutUser } from '../../redux/auth-reducer';
import useModal from '../../hooks/useModal';
import modalTypes from '../../consts/app/modalTypes';

const HeaderContainer = (props) => {
    const {showModal} = useModal(modalTypes.LOGIN_MODAL)

    const handleOpenModal = () => {
        if(props.location.pathname !== routePaths.LOGIN){
            showModal({modal: true})
        }
    }

    const {isLoginFailed, isLoginDataFetching, layoutType, setShowSidebar, location} = props
    const showSidebarWidget = location.pathname === routePaths.PSYCHOLOGISTS

    return (
        <Header
            handleOpenModal={handleOpenModal}
            showSidebarWidget={showSidebarWidget}
            setShowSidebar={setShowSidebar}
            isLoginFailed={isLoginFailed}
            isLoginDataFetching={isLoginDataFetching}
            logoutUser={logoutUser}
            layoutType={layoutType}
            location={location}
        />
    )
}

const mapStateToProps = (state) => ({
    isLoginFailed: state.auth.loginFailed,
    isLoginDataFetching: state.auth.isLoginDataFetching,
    layoutType: state.app.layoutType
})

export default compose(connect(
    mapStateToProps, 
    {getUserLoginData, logoutUser, setShowSidebar}),
    withRouter
)(HeaderContainer);
