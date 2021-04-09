import  {RESTUARANTS}  from './constants';



export const addRestuarant = restuarant => ({
	type: RESTUARANTS.ADD_RESTUARANTS,
	restuarant
});
export const changeName = name =>({
    type:RESTUARANTS.CHANGE_NAME,
    name
})
export const changeEmail = email =>({
    type:RESTUARANTS.CHANGE_EMAIL,
    email
})
export const changePassword = password =>({
    type:RESTUARANTS.CHANGE_PASSWORD,
    password 
})
export const changeAddress = address =>({
    type:RESTUARANTS.CHANGE_ADDRESS,
    address
})
export const changeCity = city =>({
    type:RESTUARANTS.CHANGE_CITY,
    city
})
export const changeState = state =>({
    type:RESTUARANTS.CHANGE_STATE,
    state
})
export const changeZip = zip =>({
    type:RESTUARANTS.CHANGE_ZIP,
    zip
})
export const changeContact1 = contact =>({
    type:RESTUARANTS.CHANGE_CONTACT1,
    contact
})
export const changeContact2 = contact =>({
    type:RESTUARANTS.CHANGE_CONTACT2,
    contact
})
export const changeTagline = tagline =>({
    type:RESTUARANTS.CHANGE_TAGLINE,
    tagline
})
export const changeDescription = description =>({
    type:RESTUARANTS.CHANGE_DESCRIPTION,
    description
})

export const changeFacebook = facebook =>({
    type:RESTUARANTS.CHANGE_FACEBOOK,
    facebook
})
export const changeInstagram = instagram =>({
    type:RESTUARANTS.CHANGE_INSTAGRAM,
    instagram
})
export const changePinterest = pinterest =>({
    type:RESTUARANTS.CHANGE_PINTEREST,
    pinterest
})
export const changeTwitter = twitter =>({
    type:RESTUARANTS.CHANGE_TWITTER,
    twitter
})
export const changeGoogleMap = googleMap =>({
    type:RESTUARANTS.CHANGE_GOOGLE_MAP,
    googleMap
})
export const changeLogo = logo =>({
    type:RESTUARANTS.CHANGE_LOGO,
    logo
})
export const changeCover = cover =>({
    type:RESTUARANTS.CHANGE_COVER,
    cover
})
export const saveChanges=(data)=>({
    type:RESTUARANTS.SAVE_CHANGES,
    data:data
})
export const getRestuarantData=()=>({
    type:RESTUARANTS.GET_RESTUARANT_DATA,
    
})
export const getRestuarantDataApi=(data)=>({
    type:RESTUARANTS.GET_RESTUARANT_DATA_API,
    data
})
export const changeStatus=(status)=>({
    type:RESTUARANTS.SET_DATA_STATUS,
    status
})
export const deleteRestuarant=(id)=>({
    type:RESTUARANTS.DELETE_RESTUARANTS,
    id
})
export const deleteRestuarantSuccess=(id)=>({
    type:RESTUARANTS.DELETE_RESTUARANTS_SUCCESS,
    id
})

export const editRestuarantData=(data,id)=>({
    type:RESTUARANTS.EDIT_RESTUARANTS_API,
    data,
    id
})
export const setInitial=()=>({
    type:RESTUARANTS.SET_INITIAL,
})