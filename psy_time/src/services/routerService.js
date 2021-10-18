import history from './historyService';

const forwardTo = (location) => {
    history.getHistory().push(location)
}

export default {
    forwardTo
}