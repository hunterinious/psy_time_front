import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import PsyProfilesContainer from './components/Psychologists/PsyProfilesContainer';

class App extends Component {
  render() {
      return (
        <div className="app-wrapper">
          <Header />
          <div className="app-wrapper-content">
            <Route exact path='/' render={ () => <Home />} />
            <Route exact path='/psychologists' render={ () => <PsyProfilesContainer />} />
          </div>
          <Footer />
        </div>
      )
  }
}

export default App;