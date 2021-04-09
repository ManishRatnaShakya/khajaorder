import  {ORDERS}  from './constants';




// export const changeCategoryName = name =>({
//     type:CATEGORY.CHANGE_CATEGORY_NAME,
//     name
// })

// export const changeCategoryImage = image =>({
//     type:CATEGORY.CHANGE_CATEGORY_IMAGES,
//     image
// })

// export const saveChanges=()=>({
//     type:CATEGORY.SAVE_CATEGORY_CHANGES
// })
export const getOrderDataAPI=()=>({
    type:ORDERS.GET_ORDER_DATA_API
})

export const changeOrderStatus=(status)=>({
    type:ORDERS.ORDER_STATUS_UPDATE,
    status
})
// export const setCategoryData=(data)=>({
//     type:CATEGORY.SET_CATEGORY_DATA_API,
//     data
// })

// export const deleteCategory=(id)=>({
//     type:CATEGORY.DELETE_CATEGORY,
//     id,
// })

// export const setInitial=()=>({
//     type:CATEGORY.SET_INITIAL
// })