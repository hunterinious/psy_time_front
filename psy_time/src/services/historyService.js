import {createBrowserHistory} from 'history';

let history;

const getHistory = () => {
    if (!history) {
        history = createBrowserHistory();
    }

    return history;
};

export default {
    getHistory,
};