import apiCaller from '../api/apiCaller';


const callRequest = async (config) => {
    const {
        action: { path, method, requiredAuth },
        payload, onSuccess, onFail
      } = config;

    try {
        let headers = config.headers || {};
        if (requiredAuth) {
            headers.Authorization = "JWT " + localStorage.getItem('access_token')
        }
        const url = path(payload);

        const response = await apiCaller(url, method, payload || null, headers);    
        if (onSuccess) { onSuccess(response); }
        return response
        
    } catch (e) {
        if (onFail) { onFail(e); };
    }
}

export default {
    callRequest
}