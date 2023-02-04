import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR, LOGIN_FAIL, USER_LOGIN_SUCCESS,
    USER_CREATE_SUCCESS, USER_CREATE_FAIL, USER_LOGOUT_SUCCESS, USER_LOGOUT_SUCCESS_CLEAR} from '../types/authType'
import deCodeToken from 'jwt-decode'

const authState = {
    loading: true,
    authenticate: false,
    error: '',
    successMessage: '',
    myInfo: ''
}



const tokenDecode = (token) => {
    const tokenDecoded = deCodeToken(token);
    const expTime = new Date(tokenDecoded.exp * 1000);
    if (new Date() > expTime) {
        return null
    }
    return tokenDecoded;
}

const getToken = localStorage.getItem('authToken');
if (getToken) {
    const getInfo = tokenDecode(getToken)
    // console.log(getInfo)
    if (getInfo) {
        authState.myInfo = getInfo;
        authState.authenticate = true;
        authState.loading = false
    }
}


export const authReducer = (state = authState, action) => {
    const { payload, type } = action;
    if (type === LOGIN_FAIL) {
        return {
            ...state,
            error: payload.error,
            authenticate: false,
            loading: true,
            myInfo: ''
        }
    }
    if ( type === USER_LOGIN_SUCCESS) {
        // console.log(payload)
        const myInfo = tokenDecode(payload.token);

        return {
            ...state,
            myInfo: myInfo,
            successMessage: payload.successMessage,
            error: '',
            authenticate: true,
            loading: false
        }
    }
    if (type === USER_CREATE_FAIL) {
        return {
            ...state,
            error: payload.error,
            authenticate: false,
            loading: true,
            myInfo: ''
        }
    }
    if ( type === USER_CREATE_SUCCESS) {
        // console.log(payload)
        const myInfo = tokenDecode(payload.token);

        return {
            ...state,
            myInfo: '',
            successMessage: payload.successMessage,
            error: '',
            authenticate: false,
            loading: true
        }
    }
    if ( type === USER_LOGOUT_SUCCESS) {
        return {
            ...state,
            myInfo: '',
            successMessage: '',
            error: '',
            authenticate: false,
            loading: true
        }
    }
    if (type === SUCCESS_MESSAGE_CLEAR) {
        return {
            ...state,
            successMessage: ''
        }
    }
    if (type === ERROR_CLEAR) {
        return {
            ...state,
            error: ''
        }
    }
    return state;
}