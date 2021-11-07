import commonApiService from "./commonApiService";
import { AppRequest } from "../api";


const callHelpRequest = async (data, onSuccess, onFail) => {
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

