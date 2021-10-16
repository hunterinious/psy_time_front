import history from './history';

const forwardTo = (location) => {
    history.getHistory().push(location)
}

export default {
    forwardTo
}