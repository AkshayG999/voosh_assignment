import {configureStore} from '@reduxjs/toolkit'
import {createStore, compose, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './reducers/authReducers'
import {orderReducers} from './reducers/orderReducers'


const rootReducer = combineReducers({
    auth: authReducer,
    orders: orderReducers
});

const middleware = [thunkMiddleware]

const store = configureStore({reducer : rootReducer});

export default store;