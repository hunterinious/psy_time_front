import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import * as routePaths from '../../consts/routePaths';
import { getUserLoginData } from '../../redux/auth-reducer';

class HeaderContainer extends Component {
    constructor(props){
        super()
        this.state = {showModal: false}
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleOpenModal() {
        if(this.props.location.pathname !== routePaths.LOGIN){
            this.setState({showModal: true})
        }
    }

    handleCloseModal() {
        this.setState({showModal: false})
    }

    render() {
        return (
            <Header
            handleOpenModal={this.handleOpenModal}
            handleCloseModal={this.handleCloseModal}
            showModal={this.state.showModal}
            isLoginFailed={this.props.isLoginFailed}
            isLoginDataFetching={this.props.isLoginDataFetching}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    isLoginFailed: state.auth.loginFailed,
    isLoginDataFetching: state.auth.isLoginDataFetching
})

export default compose(connect(mapStateToProps, {getUserLoginData}), withRouter)(HeaderContainer);
