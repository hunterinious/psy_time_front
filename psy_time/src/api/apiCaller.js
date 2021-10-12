import axios from 'axios';
import { handleUnauthorized } from './interceptors';

const env = process.env
const devMode = process.env.NODE_ENV === 'development';
const baseUrl = devMode ? env.REACT_APP_API_DEV_BASE_URL : env.REACT_APP_API_PROD_BASE_URL


// eslint-disable-next-line import/no-anonymous-default-export
export default function (url, method, data = null, extraHeaders = null) {
    let headers = {};
    headers['Content-Type'] = 'application/json';
    if (extraHeaders) {
        headers = {...headers, ...extraHeaders}
    }
    
    axios.interceptors.response.use(
        response => response,
        error => {
            if(error.response.status === 401) return handleUnauthorized(error)
            return Promise.reject(error)
        }
    );
    
    return axios({
        withCredentials: 'Authorization' in headers,
        url: `${baseUrl}/${url}`,
        method,
        data,
        headers,
    }).then((response) => {
        if (devMode) {
        console.log('-----------------------------------');
        console.log(`%c Response from ${method.toUpperCase()} /${url} `, 'background: #e6e6e6; color: #000; font-weight: bold;');
        console.log(response);
        console.log('-----------------------------------');
        }

        return {
            data: response.data || {},
            status: {
                text: response.statusText,
                code: response.status,
            } 
        };
    }).catch((error) => {
        if (devMode) {
            console.log(`%c Response from ${method.toUpperCase()} /${url} `, 'background: #e6e6e6; color: #000; font-weight: bold;');
            console.log(`%c Error ${error.response.status || error.status} `, 'background: tomato; color: #fff; font-weight: bold;', error.response || error);
        }

        if (error.response) {
            return Promise.reject({
                status: error.response.status,
                data: error.response.data,
                statusText: error.response.statusText || ''
            });
        }

        return Promise.reject(error);
    });
}
