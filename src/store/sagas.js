import { all } from 'redux-saga/effects'

//public
import accountSaga from './auth/register/saga';
import loginSaga from './Login/sagas';
import forgetSaga from './auth/forgetpwd/saga';
import LayoutSaga from './layout/saga';
import restuarantData from './Restuarant/sagas';
import categoryData from './Category/sagas';
import itemsData from './Items/sagas';
import orderData from './orders/sagas';
import bannerDataAPI from './Banner/sagas';
export default function* rootSaga() {
    yield all([
        
        //public
        orderData(),
        categoryData(),
        accountSaga(),
        itemsData(),
        loginSaga(),
        forgetSaga(),
        LayoutSaga(),
        restuarantData(),
        bannerDataAPI(),
    ])
}