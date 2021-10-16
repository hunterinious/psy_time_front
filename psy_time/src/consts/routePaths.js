import * as routeParams from './routeParams';


export const HOME = '/';
export const PSYCHOLOGISTS = '/psychologists';
export const PSY_PUBLIC_PROFILE = '/public-profile'
export const PSY_PUBLIC_PROFILE_PARAMETERIZED = `${PSY_PUBLIC_PROFILE}/:${routeParams.PUBLIC_PROFILE_ID}?`;
export const PRIVATE_PROFILE = '/profile';
export const REGISTRATION = '/registration';
export const LOGIN = `/login`;;