import axios from 'axios';
import { AuthRequest } from '.';
import commonApiService from '../services/commonApiService';
import storageService from '../services/storageService';

export const addAuthorizationHeader = (config) => {
    config.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
    return config
}

let isRefreshCalled = false

export const handleUnauthorized = async (error) => {
    const INVALID_OR_EXPIRED = ['Token is invalid or expired', 'Given token not valid for any token type']
    const originalRequest = error.config;
    const response = error.response
    const detail = response.data.detail

    if (INVALID_OR_EXPIRED.includes(detail) && !isRefreshCalled) {
        const refresh_token = localStorage.getItem('refresh_token');

        if(!refresh_token){
            return Promise.reject(error)
        }

        isRefreshCalled = true

        return commonApiService.callRequest(
            {
                payload: {refresh: refresh_token},
                action: AuthRequest.refreshToken
            }
        )
        .then((response) => {
            const data = response.data
            storageService.setTokens(data.access, data.refresh)

            originalRequest.headers['Authorization'] = "JWT " + data.access;
            return axios(originalRequest);
        })
        .catch(error => {
            return Promise.reject(error)
        });
            
    }
    return Promise.reject(error);
}

