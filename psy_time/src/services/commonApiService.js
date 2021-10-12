import apiCaller from '../api/apiCaller';
import querystring from 'querystring';


const callRequest = async (config) => {
    const {
        action: { path, method, requiredAuth },
        payload, onSuccess, onFail
      } = config;

    try {
        const configParams = config.params
        let headers = config.headers || {};
        let extraConfig = config.extraConfig || {}

        if(configParams){
            extraConfig.params = configParams
            extraConfig.paramsSerializer = function paramsSerializer(params) {
                return querystring.stringify(params)
            }
        }
        if (requiredAuth) {
            headers.Authorization = "JWT " + localStorage.getItem('access_token')
        }
        const url = path(payload);

        const response = await apiCaller(url, method, payload || null, headers || null, extraConfig);    
        if (onSuccess) { onSuccess(response); }
        return response
        
    } catch (e) {
        if (onFail) { onFail(e); };
    }
}

export default {
    callRequest
}