import  {ITEMS}  from './constants';



export const changeItemName = name =>({
    type:ITEMS.CHANGE_ITEMS_NAME,
    name
})

export const changeItemNickname = nickname =>({
    type:ITEMS.CHANGE_ITEM_NICKNAME,
    nickname
})
export const changeCategory = category =>({
    type:ITEMS.CHANGE_ITEM_CATEGORY,
    category
})
export const changeRestuarant = restuarant =>({
    type:ITEMS.CHANGE_RESTUARANT,
    restuarant
})
export const changeRegularPrice = price =>({
    type:ITEMS.CHANGE_ITEM_REGULAR_PRICE,
    price
})
export const changeNewPrice = nprice =>({
    type:ITEMS.CHANGE_ITEM_NEW_PRICE,
    nprice
})
export const changeDiscountRate = discountRate =>({
    type:ITEMS.CHANGE_ITEM_DISCOUNT_RATE,
    discountRate
})
export const changeDescription = desc =>({
    type:ITEMS.CHANGE_ITEM_DESCRIPTION,
    desc
})

export const changeImage1 = image1 =>({
    type:ITEMS.CHANGE_ITEM_IMAGES1,
    image1
})
export const changeImage2 = image2 =>({
    type:ITEMS.CHANGE_ITEM_IMAGES2,
    image2
})

export const saveItemChanges=(data)=>({
    type:ITEMS.SAVE_ITEMS_CHANGES,
    data
})
export const editItemChanges=(data,id)=>({
    type:ITEMS.EDIT_ITEMS_API,
    data,
    id,
})

export const getItemData=()=>({
    type:ITEMS.GET_ITEMS_DATA
})
export const deleteItem=(id)=>({
    type:ITEMS.DELETE_ITEMS,
    id,
})
export const setInitial=()=>({
    type:ITEMS.SET_INITIAL,
})