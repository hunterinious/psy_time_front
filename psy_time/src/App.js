import React, { Component } from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import PsyProfilesContainer from './components/Psychologists/PsyProfilesContainer';
import PsyPublicProfileContainer from './components/Psychologists/PublicProfile/PsyPublicProfileContainer';
import ProfilesContainer from './components/PrivateProfiles/ProfilesContainer';
import Registration from './components/Authentication/Registration/Registration';
import LoginContainer from './components/Authentication/Login/Login';
import * as routePaths from './consts/routePaths';
import { connect } from 'react-redux';
import { getUserLoginData } from './redux/auth-reducer';


require('dotenv').config()

class App extends Component {
  componentDidMount(){
    if (!this.props.isAuth && !this.props.loginFailed){
		this.props.getUserLoginData()
    }
  }
  render() {
      return (
        <div className="app-wrapper">
			<HeaderContainer />
			<div className="app-wrapper-content">
				<Switch>
					<Route exact path={routePaths.HOME} render={ () => <Home />} />
					<Route exact path={routePaths.PSYCHOLOGISTS} render={ () => <PsyProfilesContainer />} />
					<Route path={routePaths.PSY_PUBLIC_PROFILE_PARAMETERIZED} render={ () => <PsyPublicProfileContainer/>} />
					<Route path={routePaths.PRIVATE_PROFILE} render={ () => <ProfilesContainer />} />
					<Route path={routePaths.REGISTRATION} render={ () => <Registration />} />
					<Route path={routePaths.LOGIN} render={ () => <LoginContainer modal={false} />} />
				</Switch>
			</div>
			<Footer />
        </div>
      )
  }
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
		loginFailed: state.auth.loginFailed
    }
}

export default connect(mapStateToProps, {getUserLoginData})(App);