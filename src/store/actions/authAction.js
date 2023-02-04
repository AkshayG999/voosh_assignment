import axios from 'axios'
import { USER_LOGIN_SUCCESS, LOGIN_FAIL, USER_CREATE_SUCCESS, USER_CREATE_FAIL} from '../types/authType'
import {ORDER_CREATE_SUCCESS, ORDER_GET_SUCCESS, ORDER_CREATE_FAIL, ORDER_GET_FAIL} from '../types/orderType'


// const token = localStorage.getItem("authToken");

export const userAuth = (token)=>{
    axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${token}`;
          return config;
        },
        error => {
          return Promise.reject(error)
        }
      )
}



export const userCreate = (datas) =>{
    return async (dispatch) =>{
        const url = 'http://localhost:8080'
        try{
            // console.log(datas)
            const response = await axios.post(`${url}/add-user`, datas)
            // console.log(response.data.data)

            
            dispatch({
                type : USER_CREATE_SUCCESS,
                payload : {
                    successMessage : response.data.message,
                }
            })

        }catch(error){
            let data = error.response.data.message
            // console.log(error)
            dispatch({
                type : USER_CREATE_FAIL,
                payload:{
                    error : data
                }
            })
        }
    }
}



export const userLogin = (datas) =>{
    return async (dispatch) =>{
        const url = 'http://localhost:8080'
        try{
            // console.log(datas)
            const response = await axios.post(`${url}/login-user`, datas)
            console.log(response.data.token)
            localStorage.setItem('authToken', response.data.token)
            
            dispatch({
                type : USER_LOGIN_SUCCESS,
                payload : {
                    successMessage : response.data.message,
                    token : response.data.token
                }
            })

        }catch(error){
            // let data = error.response.data.message
            console.log(error)
            dispatch({
                type : LOGIN_FAIL,
                payload:{
                    error : error
                }
            })
        }
    }
}




export const createOrder = (datas) =>{
    return async (dispatch) =>{
        const url = 'http://localhost:8080'
        let token = localStorage.getItem('authToken')
        try{
            userAuth(token)
            // console.log(datas)
            const response = await axios.post(`${url}/add-order`, datas)
            // console.log(response.data.data)

            
            dispatch({
                type : ORDER_CREATE_SUCCESS,
                payload : {
                    ordersuccessMessage : response.data.message,
                    orders : response.data.data
                }
            })

        }catch(error){
            let data = error.response.data.message
            // console.log(error)
            dispatch({
                type : ORDER_CREATE_FAIL,
                payload:{
                    error : data
                }
            })
        }
    }
}




export const getOrder = (datas) =>{
    return async (dispatch) =>{
        const url = 'http://localhost:8080'
        const config = {
            headers : {
                'Content-Type': 'application/josn',
                user_id: datas.user_id
            }
        }
        let token = localStorage.getItem('authToken')
        try{
            userAuth(token)
            // console.log(datas)
            const response = await axios.get(`${url}/get-order`, config)
            // console.log(response.data.data)

            
            dispatch({
                type : ORDER_GET_SUCCESS,
                payload : {
                    getsuccessMessage : response.data.message,
                    orders: response.data.data
                }
            })

        }catch(error){
            let data = error.response.data.message
            // console.log(error)
            dispatch({
                type : ORDER_GET_FAIL,
                payload:{
                    error : data
                }
            })
        }
    }
}

