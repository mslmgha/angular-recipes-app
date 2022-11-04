import { User } from "../user.model";
import { AuthenticationActionsType, AUTHENTICATE, AUTHENTICATE_FAILED, LOGIN_START, LOGOUT, SIGNUP_START, AUTO_LOGIN } from "./authentication.action";

export interface State {
    user: User,
    errorMessage: string,
    loading: boolean
}
const initialState: State = {
    user: null,
    errorMessage: null,
    loading: false,
}

export function authenticationReducer(state: State = initialState, action: AuthenticationActionsType) {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                ...state,
                user: new User(
                    action.payload.email,
                    action.payload.id,
                    action.payload.token,
                    action.payload.expiresDate
                ),
                loading: false,
            };
        case LOGOUT:
            return {
                ...state,
                user: null
            };
        case LOGIN_START:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            };
        case AUTHENTICATE_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false,
            };
        case SIGNUP_START:
            return {
                ...state,
                errorMessage: null,
                loading: true,
            };
        case AUTO_LOGIN:
            return {
                ...state
            };
        default:
            return state;
    }
}