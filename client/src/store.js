import { combineReducers } from 'redux'

import { createStore, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import { composeWithDevTools } from 'redux-devtools-extension'
import { getAllPizzasReducer } from './reducers/pizzaReducers'
import { cartReducer } from './reducers/cartReducer'
import { loginUserReducer, registerUserReducer ,addCustomerReducer } from './reducers/userReducer'
import { adminloginReducer} from './reducers/adminReducer'
import { feedbackReducer } from './reducers/feedbackReducer'
import { placeOrderReducer, getUserOrdersReducer } from './reducers/orderReducer'
import { driverloginReducer } from './reducers/driverReducer'
import { getAllNewsReducer } from './reducers/newsfeedReducer'
import { getAllJobsReducer } from './reducers/jobsReducer'
import { jobApplyReducer } from './reducers/jobApplyReducer'
import { addRefundReducer ,getAllRefundsReducer } from './reducers/refundReducer'


const finalReducer = combineReducers({

    getAllPizzasReducer: getAllPizzasReducer,
    getAllJobsReducer:getAllJobsReducer,
    cartReducer: cartReducer,
    registerUserReducer: registerUserReducer,
    loginUserReducer: loginUserReducer,
    adminloginReducer: adminloginReducer,
    placeOrderReducer: placeOrderReducer , 
    feedbackReducer : feedbackReducer,
    getUserOrdersReducer : getUserOrdersReducer,
    addCustomerReducer : addCustomerReducer,
    driverloginReducer : driverloginReducer,
    getAllNewsReducer: getAllNewsReducer,
    jobApplyReducer : jobApplyReducer,
    addRefundReducer : addRefundReducer,
    getAllRefundsReducer : getAllRefundsReducer
    
})

const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null

const currentAdmin = localStorage.getItem('currentAdmin') ? JSON.parse(localStorage.getItem('currentAdmin')) : null

const currentDriver = localStorage.getItem('currentDriver') ? JSON.parse(localStorage.getItem('currentDriver')) : null

const currentNotifications = localStorage.getItem('currentNotifications') ? JSON.parse(localStorage.getItem('currentNotifications')) : null




const initialState = {
    cartReducer: {
        cartItems: cartItems
    },
    loginUserReducer: {
        currentUser: currentUser,
        currentNotifications: currentNotifications,
        
    },
    adminloginReducer: {
        currentAdmin: currentAdmin,
        currentNotifications: currentNotifications,
        
    },
    driverloginReducer: {
        currentDriver: currentDriver,
        
        
    }
   
}

const composeEnhancers = composeWithDevTools({})
const store = createStore(finalReducer, initialState, composeEnhancers(applyMiddleware(thunk)))


export default store