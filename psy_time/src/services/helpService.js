import commonApiService from "./commonApiService";
import helpAPI from "../api/helpAPI";


const callHelpRequest = async ({payload, onSuccess, onFail}) => {
    commonApiService.callRequest(
        {
            payload: payload,
            action: helpAPI.help,
            onSuccess: (res) => { if (onSuccess) { onSuccess(res); } },
            onFail: (res) => { if (onFail) { onFail(res); } }
        }
    )
}

export default {
    callHelpRequest
}

