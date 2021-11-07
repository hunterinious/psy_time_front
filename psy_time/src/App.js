import React, { useEffect } from 'react';
import Routes from './Routes';
import WindowResizeChecker from './components/WindowResizeChecker/WindowReisizeChecker';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import { connect } from 'react-redux';
import { getUserLoginData } from './redux/auth-reducer';
import './App.scss';

require('dotenv').config()

const App = (props) => {
	const {isAuth, loginFailed, getUserLoginData} = props

  	useEffect(() => {
		if (!isAuth && !loginFailed){
			getUserLoginData()
		}
	}, [isAuth, loginFailed])

	return (
		<div className="app-wrapper">
			<WindowResizeChecker />
			<div  className="app-wrapper-content">
				<HeaderContainer/>
				<Routes />
				<Footer />
			</div>
		</div>
	)
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
		loginFailed: state.auth.loginFailed,
    }
}

export default connect(mapStateToProps, {getUserLoginData})(App);