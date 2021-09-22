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

        const { response } = await apiCaller(url, method, payload || null, headers);
        const { status } = response

        if (status && status.code >= 400) {
            if (onFail) { onFail(response); }
        } else {
            if (onSuccess) { onSuccess(response); }
            return response
        }
    } catch (e) {
        if (onFail) { onFail(e); };
    }
}

export default {
    callRequest
}