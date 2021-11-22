import commonApiService from "./commonApiService";
import { AppRequest } from "../api";


const callHelpRequest = async (data, onSuccess, onFail) => {
    const {message} = data
    data.message = message ? message : null
    commonApiService.callRequest(
        {
            payload: data,
            action: AppRequest.help,
            onSuccess,
            onFail
        }
    )
}

export default {
    callHelpRequest
}

