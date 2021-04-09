import { combineReducers  } from 'redux';

// Front
import Layout from './layout/reducer';

// Authentication Module
import Account from './auth/register/reducer';
// import Login from './auth/login/reducer';
import Login from "./Login/reducers";
import Forget from './auth/forgetpwd/reducer';
import Restuarant from './Restuarant/reducers';
import Category from './Category/reducers';
import Items from './Items/reducers';
import Orders from './orders/reducers';
import Banner from './Banner/reducers';
const rootReducer = combineReducers({

    // public
    Layout,
    Restuarant,
    Category,
    Items,
    Orders,
    Banner,
    // Authentication
    Account,
    Login,
    Forget

});

export default rootReducer;