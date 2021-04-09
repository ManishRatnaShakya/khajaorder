import {ITEMS}  from './constants';
import produce from 'immer';
export const initialState= {
    
};

const Items =(state=initialState ,action)=>
    produce(state,draft=>{
	// eslint-disable-next-line default-case
	switch (action.type) {
		
        case ITEMS.CHANGE_ITEM_NAME:
            draft.name = action.name;
            break;
	
        case ITEMS.CHANGE_ITEM_NICKNAME:
            draft.nickname = action.nickname;
            break;
	
        case ITEMS.CHANGE_ITEM_CATEGORY:
            draft.category = action.category;
            break;
	
        case ITEMS.CHANGE_RESTUARANT:
            draft.restuarant = action.restuarant;
            break;
	
        case ITEMS.CHANGE_ITEM_REGULAR_PRICE:
            draft.price = action.price;
            break;
	
        case ITEMS.CHANGE_ITEM_NEW_PRICE:
            draft.nprice = action.nprice;
            break;
	
        case ITEMS.CHANGE_ITEM_DISCOUNT_RATE:
            draft.discountRate = action.discountRate;
            break;
	
        case ITEMS.CHANGE_ITEM_DESCRIPTION:
            draft.description = action.desc;
            break;
	
    
        case ITEMS.CHANGE_ITEM_IMAGES1:
            draft.image1=action.image1;
            break;
        case ITEMS.CHANGE_ITEM_IMAGES2:
            draft.image2=action.image2;
            break;
        
        case ITEMS.GET_ITEMS_DATA_SUCCESS:
            draft.data=action.data;
            break;
	
        case ITEMS.SET_ITEMS_DATA_LOADING:
            draft.setLoading=true;
            draft.setSuccess=false;
            draft.setError="";
            break;
        
        case ITEMS.SET_ITEMS_DATA_ERROR:
            draft.setLoading=false;
            draft.setSuccess=false;
            draft.setError=action.error;
            break;
        
        case ITEMS.SET_ITEMS_DATA_SUCCESS:
            draft.setLoading=false;
            draft.setSuccess=true;
            draft.setError='';
            break;

        case ITEMS.SET_INITIAL:
           draft.data=[];
           draft.setSuccess=false;
           draft.setLoading=false;
           draft.setError="";
           draft.editSuccess=false;
           draft.editLoading=false;
           draft.editError="";
            break;

        case ITEMS.DELETE_ITEMS_SUCCESS:
            console.log("the data",action.id)
            const newData = state.data.filter(data => data.i_id !== action.id);
            console.log("the new data",newData)
            draft.data= newData;
            break;

        case ITEMS.EDIT_ITEMS_API_SUCCESS:
            draft.editSuccess=true;
           draft.editLoading=false;
           draft.editError="";
            break;
        case ITEMS.EDIT_ITEMS_API_LOADING:
            draft.editSuccess=false;
           draft.editLoading=true;
           draft.editError="";
            break;
        case ITEMS.EDIT_ITEMS_API_ERROR:
            draft.editSuccess=false;
           draft.editLoading=false;
           draft.editError=action.error;
            break;

    }
});
export default Items;