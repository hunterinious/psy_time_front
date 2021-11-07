import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import PsyProfilesContainer from './components/Psychologists/PsyProfilesContainer';
import PsyPublicProfileContainer from './components/Psychologists/PublicProfile/PsyPublicProfileContainer';
import ProfilesContainer from './components/PrivateProfiles/ProfilesContainer';
import Registration from './components/Authentication/Registration/Registration';
import LoginContainer from './components/Authentication/Login/Login';
import About from './components/About/About';
import * as routePaths from './consts/route/routePaths';

const Routes = () => {
    return (
        <Switch>
            <Route exact path={routePaths.HOME} render={ () => <Home />} />
            <Route exact path={routePaths.PSYCHOLOGISTS} render={ () => <PsyProfilesContainer />} />
            <Route path={routePaths.PSY_PUBLIC_PROFILE_PARAMETERIZED} render={ () => <PsyPublicProfileContainer/>} />
            <Route path={routePaths.PRIVATE_PROFILE} render={ () => <ProfilesContainer />} />
            <Route path={routePaths.REGISTRATION} render={ () => <Registration />} />
            <Route path={routePaths.LOGIN} render={ () => <LoginContainer modal={false} />} />
            <Route path={routePaths.ABOUT} render={ () => <About />} />
        </Switch>
    );
};

export default Routes;
