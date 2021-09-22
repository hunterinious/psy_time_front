import axios from 'axios';

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

    return axios({
        validateStatus: () => true,
        withCredentials: 'Authorization' in headers,
        url: `${baseUrl}/${url}`,
        method,
        data,
        headers,
    }).then((response) => {
        if (devMode && response.status >= 400) {
        console.log(`%c Response from ${method.toUpperCase()} /${url} `, 'background: #e6e6e6; color: #000; font-weight: bold;');
        console.log(`%c Error ${response.status} `, 'background: tomato; color: #fff; font-weight: bold;', response);
        } else if (devMode) {
        console.log('-----------------------------------');
        console.log(`%c Response from ${method.toUpperCase()} /${url} `, 'background: #e6e6e6; color: #000; font-weight: bold;');
        console.log(response);
        console.log('-----------------------------------');
        }

        return {
            response: {
                data: response.data || {},
                status: {
                    text: response.statusText,
                    code: response.status,
                } 
            }  
        };
    }).catch((error) => {
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
