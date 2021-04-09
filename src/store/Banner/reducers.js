import {BANNER}  from './constants';
import produce from 'immer';
export const initialState= {
       
         
 
};

const Banner =(state=initialState ,action)=>
    produce(state,draft=>{
	// eslint-disable-next-line default-case
	switch (action.type) {
		case BANNER.GET_BANNER_DATA_SUCCESS:
            draft.data=action.data;
            break;
		case BANNER.GET_BANNER_DATA_ERROR:
            draft.data=action.error;
            break;
        
    }
});
export default Banner;