import { apiEndPoints } from "./apiEndPoints";

export const API_REQUESTS = {
    USER_REGISTER: {
        METHOD: 'POST',
        URL: apiEndPoints.auth.register,
        PAYLOAD: {}
    },
    USER_LOGIN: {
        METHOD: 'POST',
        URL: apiEndPoints.auth.login,
        PAYLOAD: {}
    },
    SOCIAL_LOGIN: {
        METHOD: 'POST',
        URL: apiEndPoints.auth.socialLogin,
        PAYLOAD: {}
    }
}