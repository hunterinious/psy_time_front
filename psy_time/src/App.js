import React, { useEffect } from 'react';
import Routes from './Routes';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import { connect } from 'react-redux';
import { getUserLoginData } from './redux/auth-reducer';
import './App.css';


require('dotenv').config()

const App = (props) => {
	const {isAuth, loginFailed, getUserLoginData} = props

  	useEffect(() => {
		if (!isAuth && !loginFailed){
			getUserLoginData()
		}
	}, [isAuth, loginFailed])

	return (
	<div  className="app-wrapper">
		<HeaderContainer/>
		<div  className="app-wrapper-content">
			<Routes />
		</div>
		<Footer />
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