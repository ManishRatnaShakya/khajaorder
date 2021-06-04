import {ORDERS}  from './constants';
import produce from 'immer';
export const initialState= {
       
         
 
};

const Orders =(state=initialState ,action)=>
    produce(state,draft=>{
	// eslint-disable-next-line default-case
	switch (action.type) {
		
        // case CATEGORY.CHANGE_CATEGORY_NAME:
        //     draft.name = action.name;
        //     break;
	
    
        // case CATEGORY.CHANGE_CATEGORY_IMAGES:
        //     draft.image=action.image;
        //     break;

        // case CATEGORY.SET_DATA_LOADING:
        //     draft.loading=true;
        //     draft.success=false;
        //     draft.error="";
        //     break; 
            
        // case CATEGORY.SET_DATA_SUCCESS:
        //     draft.loading=false;
        //     draft.success=true;
        //     draft.error="";
        //     break; 

        // case CATEGORY.SET_DATA_ERROR:
        //     draft.loading=false;
        //     draft.success=false;
        //     draft.error=action.error;
        //     break; 

        case ORDERS.CHANGE_ORDER_STATUS:
            draft.status=action.status;
            break;
            
        case ORDERS.GET_ORDER_DATA_SUCCESS:
            draft.orders = action.data;
            draft.error='';
            draft.loading=false;
            break;

        case ORDERS.GET_ORDER_DATA_LOADING:
            draft.loading = true;
            draft.orders = [];
            draft.error ="";
            break;
        
        case ORDERS.GET_ORDER_DATA_ERROR:
            draft.loading = false;
            draft.orders = [];
            draft.error =action.error;
            break;
        
        case ORDERS.ORDER_STATUS_UPDATE_SUCCESS:
           draft.orders = action.order;
        
        // case CATEGORY.DELETE_CATEGORY_ERROR:
        //     draft.error=action.error;
        //     break;
	
        // case CATEGORY.SET_INITIAL:
        //     draft.error="";
        //     draft.success=false;
        //     draft.loading=false;
        //     break;
    }
});
export default Orders;