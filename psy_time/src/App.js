import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import PsyProfilesContainer from './components/Psychologists/PsyProfilesContainer';
import PsyPublicProfileContainer from './components/Psychologists/PublicProfile/PsyPublicProfileContainer';
import ProfilesContainer from './components/PrivateProfiles/ProfilesContainer';
import Registration from './components/Authentication/Registration/Registration';
import LoginContainer from './components/Authentication/Login/Login';

require('dotenv').config()


console.log(process.env, 'env vars')

class App extends Component {
  render() {
      return (
        <div className="app-wrapper">
          <HeaderContainer />
          <div className="app-wrapper-content">
            <Route exact path='/' render={ () => <Home />} />
            <Route exact path='/psychologists' render={ () => <PsyProfilesContainer />} />
            <Route path="/public-profile/:id" render={ () => <PsyPublicProfileContainer/>} />
            <Route path='/profile' render={ () => <ProfilesContainer />} />
            <Route path='/registration' render={ () => <Registration />} />
            <Route path='/login' render={ () => <LoginContainer modal={false} />} />
          </div>
          <Footer />
        </div>
      )
  }
}

export default App;