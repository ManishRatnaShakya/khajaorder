import { createSelector } from 'reselect';
import {initialState} from './reducers';
const selectCategory = state =>state.Category|| initialState;
// const selectRestuarantData= state=>state.data|| initialState;

export const makeSelectCategory=()=>
    createSelector(
        selectCategory,
        category=>category.category
    )

export const makeSelectCategoryName=()=>
    createSelector(
        selectCategory,
    category=>category.name
    )
  

export const makeSelectCategoryImage=()=>
    createSelector(
        selectCategory,
        category=>category.image
    )

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

export const makeSelectError=()=>
createSelector (
    selectCategory,
    category=>category.error
)

export const makeSelectEditLoading=()=>
createSelector (
    selectCategory,
    category=>category.editLoading
)
export const makeSelectEditSuccess=()=>
createSelector (
    selectCategory,
    category=>category.editSuccess
)
export const makeSelectEditError=()=>
createSelector (
    selectCategory,
    category=>category.editError
)