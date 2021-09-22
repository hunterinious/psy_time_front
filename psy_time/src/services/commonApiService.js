import apiCaller from '../api/apiCaller';


const callRequest = async (config) => {
    try {
        const {
          action: { path, method, requiredAuth },
          payload, onSuccess, onFail
        } = config;
        let headers = config.headers || {};
        if (requiredAuth) {
            headers.Authorization = "JWT " + localStorage.getItem('access_token')
        }
        const url = path(payload);

        const { data } = await apiCaller(url, method, payload || null, headers);
        if (data.code && data.code >= 400) {
            onFail(data);
        } else {
            onSuccess(data);
        }
    } catch (e) {
        config.onFail(e);
    }
}

export default {
    callRequest
}