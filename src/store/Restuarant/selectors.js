import { createSelector } from 'reselect';
import {initialState} from './reducers';

const selectRestuarant = state =>state.Restuarant|| initialState;
// const selectRestuarantData= state=>state.data|| initialState;

    export const makeSelectRestaunt=()=>createSelector(
        selectRestuarant,
        restuarant=>restuarant.data)

    export const makeSelectLoading=()=>
    createSelector(selectRestuarant,
        restuarant=>restuarant.loading
        )

    export const makeSelectDataFromAPI=()=> 
    createSelector(selectRestuarant,
        restuarant=>restuarant.data
        )

    export const makeSelectSetSuccess=()=> 
    createSelector(selectRestuarant,
        restuarant=>restuarant.setSuccess
        )
    export const makeSelectSetError=()=> 
    createSelector(selectRestuarant,
        restuarant=>restuarant.setError
        )

    export const makeSelectSetLoading=()=>
    createSelector(selectRestuarant,
        restuarant=>restuarant.setloading
        )
        
    
    export const makeSelectEditLoading=()=>
     createSelector(selectRestuarant,
        restuarant=>restuarant.editLoading
        )
    export const makeSelectEditError=()=>
     createSelector(selectRestuarant,
        restuarant=>restuarant.editError
        )
    export const makeSelectEditSuccess=()=>
     createSelector(selectRestuarant,
        restuarant=>restuarant.editSuccess
        )