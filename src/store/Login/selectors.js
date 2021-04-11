// eslint-disable-next-line no-unused-vars
import { createSelector, createStructuredSelector } from 'reselect';
import {initialState} from './reducers';
// import Login from './../../pages/Authentication/Login';
const selectLogin = state =>state.Login|| initialState;


export const makeSelectEmail=()=>
    createSelector(
        selectLogin,
        login=>login.login.email
    )
  
export const makeSelectPassword=()=>
    createSelector(
        selectLogin,
        login=>login.login.password
    )


export const makeSelectDataFromAPI=()=> 
    createSelector(selectLogin,
        restuarant=>restuarant.data
        )

export const makeSelectToken=()=>
    createSelector(selectLogin,
        login=>login.userToken
        )
export const makeSelectError=()=>
    createSelector(selectLogin,
        login=>login.error
        )

export const makeSelectLoading=()=>
    createSelector(selectLogin,
        login=>login.loading
        )    