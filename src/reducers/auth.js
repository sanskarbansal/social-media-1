import { LOGIN_START, LOGIN_FAILED, LOGIN_SUCCESS, SIGNUP_START, SIGNUP_FAILED, SIGNUP_SUCCESS } from "../actions/actionTypes";
const initAuthState = {
    user: {},
    error: null,
    isLogegdIn: false,
    inProgress: false,
};
export default function (state = initAuthState, action) {
    switch (action.type) {
        case LOGIN_START:
        case SIGNUP_START:
            return {
                ...state,
                inProgress: true,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                isLogegdIn: true,
                inProgress: false,
                error: null,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                message: action.message,
                inProgress: false,
                error: null,
                isLoggedIn: false,
            };
        case LOGIN_FAILED:
        case SIGNUP_FAILED:
            return {
                ...state,
                error: action.error,
                inProgress: false,
            };

        default:
            return state;
    }
}
