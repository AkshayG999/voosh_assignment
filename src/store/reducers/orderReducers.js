import {
    ORDER_CREATE_SUCCESS, ORDER_GET_SUCCESS, ORDER_CREATE_FAIL, ORDER_GET_FAIL, ORDER_SUCCESS_MESSAGE_CLEAR,
    ORDER_ERROR_CLEAR}
        from '../types/orderType'

import {USER_LOGOUT_SUCCESS } from '../types/authType'


const userState = {
   orders: [],
   orderMessagee: '',
   orderMessage: '',
   orderError: ''
}

export const orderReducers = (state = userState, action) => {
   const { type, payload } = action
   // const {users, successMessage } = payload
   // console.log(payload.users)

   if (type === ORDER_CREATE_SUCCESS) {
       return {
           ...state,
           orders: payload.orders,
           orderMessagee: payload.ordersuccessMessage,
           orderError: ""
       }
   }
   if (type === ORDER_GET_SUCCESS) {
       return {
           ...state,
           orders: payload.orders,
           orderMessage: payload.getsuccessMessage,
           orderError : ""
       }
   }
   if (type === ORDER_CREATE_FAIL) {
       return {
           ...state,
           orderError: payload.error
       }
   }
   if (type === ORDER_GET_FAIL) {
       return {
           ...state,
           orderError: payload.error
       }
   }
   if (type === USER_LOGOUT_SUCCESS) {
    return {
        ...state,
        orders: [],
        orderMessagee: '',
        orderMessage: '',
        orderError: ''
    }
}
   if (type === ORDER_SUCCESS_MESSAGE_CLEAR) {
    return {
        ...state,
        orderMessagee: ''
    }
}
if (type === ORDER_ERROR_CLEAR) {
    return {
        ...state,
        error: ''
    }
}

   return state;
}
