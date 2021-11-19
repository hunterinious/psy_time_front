import commonApiService from "./commonApiService";
import { AppRequest } from "../api";


const callAppointmentRequest = async (data, onSuccess, onFail) => {
    commonApiService.callRequest(
        {
            payload: data,
            action: AppRequest.appointment,
            onSuccess,
            onFail
        }
    )
}

export default {
    callAppointmentRequest
}

