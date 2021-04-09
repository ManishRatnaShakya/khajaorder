import {CATEGORY}  from './constants';
import produce from 'immer';
export const initialState= {
       
         
 
};

const Category =(state=initialState ,action)=>
    produce(state,draft=>{
	// eslint-disable-next-line default-case
	switch (action.type) {
		
        case CATEGORY.CHANGE_CATEGORY_NAME:
            draft.name = action.name;
            break;
	
    
        case CATEGORY.CHANGE_CATEGORY_IMAGES:
            draft.image=action.image;
            break;

        case CATEGORY.SET_DATA_LOADING:
            draft.loading=true;
            draft.success=false;
            draft.error="";
            break; 
            
        case CATEGORY.SET_DATA_SUCCESS:
            draft.loading=false;
            draft.success=true;
            draft.error="";
            break; 

        case CATEGORY.SET_DATA_ERROR:
            draft.loading=false;
            draft.success=false;
            draft.error=action.error;
            break; 

        case CATEGORY.GET_CATEGORY_DATA_SUCCESS:
            draft.category = action.data;
            break;
        
        case CATEGORY.DELETE_CATEGORY_SUCCESS:
            console.log("the data",action.id)
            const newData = state.category.filter(data => data.cat_id !== action.id);
            console.log("the new data from category",newData)
            draft.category= newData;
            break;
        
        case CATEGORY.DELETE_CATEGORY_ERROR:
            draft.error=action.error;
            break;

        case CATEGORY.EDIT_CATEGORY_SUCCESS:
            draft.editSuccess=true;
            draft.editLoading=false;
             draft.editError='';
            break;
        case CATEGORY.EDIT_CATEGORY_LOADING:
            draft.editLoading=true;
            draft.editError='';
             draft.editSuccess=false;
            break;
        case CATEGORY.EDIT_CATEGORY_ERROR:
            draft.editError=action.error;
            draft.editLoading=false;
             draft.editSuccess=false;
            break;
	
        case CATEGORY.SET_INITIAL:
            draft.editError="";
            draft.editSuccess=false;
            draft.editLoading=false;
            draft.error="";
            draft.success=false;
            draft.loading=false;
            break;
    }
});
export default Category;