import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';

class HeaderContainer extends Component {
    constructor(props){
        super()
        this.state = {showModal: false}
        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleOpenModal() {
        if(this.props.location.pathname !== '/login'){
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
            isAuth={this.props.isAuth}/>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
})

export default compose(connect(mapStateToProps, {}), withRouter)(HeaderContainer);
