import * as routePaths  from '../consts/routePaths';
import urlUtils from '../utils/urlUtils';
import routerService from './routerService';

const forwardToHomePage = () => routerService.forwardTo(routePaths.HOME)
const forwardToLoginPage = () => routerService.forwardTo(routePaths.LOGIN);
const forwardToRegistrationPage = () => routerService.forwardTo(routePaths.REGISTRATION);
const forwardToPrivateProfilePage = () => routerService.forwardTo(routePaths.PRIVATE_PROFILE);
const forwardToPsychologistsPage = () => routerService.forwardTo(routePaths.PSYCHOLOGISTS);
const forwardToPsyPublicProfilePage = (id) =>  routerService.forwardTo(urlUtils.join(routePaths.PSY_PUBLIC_PROFILE, id));

export default {
    forwardToHomePage,
    forwardToLoginPage,
    forwardToRegistrationPage,
    forwardToPrivateProfilePage,
    forwardToPsychologistsPage,
    forwardToPsyPublicProfilePage
}