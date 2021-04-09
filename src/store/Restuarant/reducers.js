import {RESTUARANTS}  from './constants';
import produce from 'immer';
// import { data } from 'browserslist';
export const initialState= {
        restuarant:{
            
        },
        loading:false,
        error:''
         
 
};

const Restuarant =(state=initialState ,action)=>
    produce(state,draft=>{
	// eslint-disable-next-line default-case
	switch (action.type) {
		case RESTUARANTS.ADD_RESTUARANTS:
		break;     
        case RESTUARANTS.GET_RESTUARANT_DATA_API:
            draft.data=action.data;
            draft.loading=false;
            draft.error="";
            break;
        
        case RESTUARANTS.GET_RESTUARANT_DATA_API_LOADING:
            draft.loading=true;
            // draft.data=[];
            draft.error="";
            break;
        
        case RESTUARANTS.GET_RESTUARANT_DATA_API_ERROR:
            draft.error=action.error;
            // draft.data=[];
            draft.loading=false;
            break;
        
        case RESTUARANTS.SET_DATA_SUCCESS:
            draft.setSuccess=true;
            draft.setloading=false;
            draft.setError = "";
            break;
        case RESTUARANTS.SET_DATA_LOADING:
            // draft.setSuccess=false;
            draft.setloading=true;
            draft.setError = "";
            break;
        case RESTUARANTS.SET_DATA_ERROR:
            draft.setSuccess=false;
            draft.setloading=false;
            draft.setError = action.error;
            break;
        
        case RESTUARANTS.DELETE_RESTUARANTS_SUCCESS:
            console.log("the data",action.id)
            const newData = state.data.filter(data => data.r_id !== action.id);
            console.log("the new data",newData)
            draft.data= newData;
            break;

        case RESTUARANTS.EDIT_RESTUARANTS_API_SUCCESS:
            draft.editSuccess=true;    
            draft.editError='';    
            draft.editLoading=false;    
            break;

        case RESTUARANTS.EDIT_RESTUARANTS_API_LOADING:
            draft.editSuccess=false;    
            draft.editError='';    
            draft.editLoading=true;    
            break;

        case RESTUARANTS.EDIT_RESTUARANTS_API_ERROR:
            draft.editSuccess=false;    
            draft.editError=action.error;    
            draft.editLoading=false;    
            break;
            
        case RESTUARANTS.SET_INITIAL:
           draft.data=[];
           draft.setSuccess=false;
           draft.loading=false;
           draft.setError="";
           draft.editSuccess=false;    
            draft.editError="";    
            draft.editLoading=false;  
           
    }
});
export default Restuarant;