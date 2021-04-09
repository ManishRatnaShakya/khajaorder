import  {CATEGORY}  from './constants';




export const changeCategoryName = name =>({
    type:CATEGORY.CHANGE_CATEGORY_NAME,
    name
})

export const changeCategoryImage = image =>({
    type:CATEGORY.CHANGE_CATEGORY_IMAGES,
    image
})

export const saveChanges=()=>({
    type:CATEGORY.SAVE_CATEGORY_CHANGES
})
export const getCategoryData=()=>({
    type:CATEGORY.GET_CATEGORY_DATA_API
})

export const setCategoryData=(data)=>({
    type:CATEGORY.SET_CATEGORY_DATA_API,
    data,
})
export const editCategoryData=(data,id)=>({
    type:CATEGORY.EDIT_CATEGORY_API,
    data,
    id,
})

export const deleteCategory=(id)=>({
    type:CATEGORY.DELETE_CATEGORY,
    id,
})

export const setInitial=()=>({
    type:CATEGORY.SET_INITIAL
})