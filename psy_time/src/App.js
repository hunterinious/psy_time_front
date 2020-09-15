import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom';
import Home from './components/Home/Home'

class App extends Component {
  render() {
      return (
        <div className="app-wrapper">
          <div className="app-wrapper-content">
            <Route exact path='/' render={ () => <Home />} />
          </div>
        </div>
      )
  }
}

export default App;