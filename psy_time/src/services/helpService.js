import commonApiService from "./commonApiService";
import { HelpRequest } from "../api";


const callHelpRequest = async (data, onSuccess, onFail) => {
    commonApiService.callRequest(
        {
            payload: data,
            action: HelpRequest.help,
            onSuccess,
            onFail
        }
    )
}

export default {
    callHelpRequest
}

