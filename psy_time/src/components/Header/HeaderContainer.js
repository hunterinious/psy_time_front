import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import * as routePaths from '../../consts/route/routePaths';
import {setShowSidebar} from '../../redux/app-reducer';
import { getUserLoginData, logoutUser } from '../../redux/auth-reducer';

class HeaderContainer extends Component {
    constructor(props){
        super()
        this.state = {showModal: false}
    }

    handleOpenModal = () => {
        if(this.props.location.pathname !== routePaths.LOGIN){
            this.setState({showModal: true})
        }
    }

    handleCloseModal = () => {
        this.setState({showModal: false})
    }

    render() {
        const {isLoginFailed, isLoginDataFetching, layoutType, setShowSidebar, location} = this.props
        const showSidebarWidget = location.pathname === routePaths.PSYCHOLOGISTS

        return (
            <Header
                handleOpenModal={this.handleOpenModal}
                handleCloseModal={this.handleCloseModal}
                showModal={this.state.showModal}
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
