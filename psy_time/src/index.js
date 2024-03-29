import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import history from './services/historyService';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'


ReactDOM.render(
    <Router history={history.getHistory()}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
