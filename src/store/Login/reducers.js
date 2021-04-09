import {LOGIN}  from './constants';
import produce from 'immer';
// import Login from './../../../../StarterKit/src/pages/Authentication/Login';
export const initialState= {
        login:{
             email:'',
             password:'',
             error:''
         }
 
};

const Login =(state=initialState ,action)=>
    produce(state,draft=>{
	// eslint-disable-next-line default-case
	switch (action.type) {
		
       
        case LOGIN.CHANGE_EMAIL:
            draft.login.email = action.email;
            break;
	
        case LOGIN.CHANGE_PASSWORD:
            draft.login.password = action.password;
            break;
	
        case LOGIN.LOGIN_USER_SUCCESSFUL:
            draft.userToken = action.userToken;
             draft.error='';
             draft.loading = false;
            
            break;

        case LOGIN.LOGIN_USER_LOADING:
            draft.loading = true;
            // draft.userToken =[];
            draft.error="";
            break;

      
        case LOGIN.LOGIN_USER_ERROR:
            draft.error=action.error;
            draft.loading = false;
            // draft.userToken =[];
            break;

        case LOGIN.LOGIN_USER_ERROR_CHANGE:
            draft.error=action.error
            break;
        
        case LOGIN.SET_INITIAL:
            draft.loading=false;
            draft.error="";
    }

});
export default Login;