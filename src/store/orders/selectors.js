import { createSelector } from 'reselect';
import {initialState} from './reducers';
const selectCategory = state =>state.Orders|| initialState;
// const selectRestuarantData= state=>state.data|| initialState;

export const makeSelectOrder=()=>
    createSelector(
        selectCategory,
        order=>order.orders
    )

// export const makeSelectCategoryName=()=>
//     createSelector(
//         selectCategory,
//     category=>category.name
//     )
  

// export const makeSelectCategoryImage=()=>
//     createSelector(
//         selectCategory,
//         category=>category.image
//     )

export const makeSelectLoading=()=>
        createSelector(
            selectCategory,
            category=>category.loading
        )

export const makeSelectSuccess=()=>
createSelector (
    selectCategory,
    category=>category.success
) 

export const makeSelectOrderStatus=()=>createSelector(
    selectCategory,
   order=>order.orders
   )

export const makeSelectOrderData=()=>createSelector(
    selectCategory,
    order=>order
)

export const makeSelectOrderId=()=>createSelector(
    selectCategory,
    order=>order.orders
)


