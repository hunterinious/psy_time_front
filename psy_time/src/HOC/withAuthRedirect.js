import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserLoginData, dropLoginStatus }  from '../redux/auth-reducer';
import Preloader from '../components/Common/Preloader/Preloader';

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth,
    loginDataIsFetching: state.auth.loginDataIsFetching,
    loginFailed: state.auth.loginFailed,
})

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            let props = this.props
            if (!props.isAuth && !props.loginDataIsFetching){
                props.dropLoginStatus({isAuth:false, loginFailed:false, isFetching:true})
                return <Redirect to='/login' />
            }else if(!props.isAuth){
                return <Preloader />
            }
            return  <Component {...this.props}/>
        }
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect, { getUserLoginData, dropLoginStatus })(RedirectComponent)

    return ConnectedAuthRedirectComponent;
}
