import { takeEvery, fork, put, all, call,select } from 'redux-saga/effects';
import { useHistory } from "react-router-dom";
// Login Redux States
import { LOGIN } from './constants';
import { loginUserSuccess,loginError,loginUserLoading } from './actions';
// import { Redirect } from "react-router-dom";
// // AUTH related methods
// import { postLogin } from '../../../helpers/fackBackend_Helper';
// import { getFirebaseBackend } from '../../../helpers/firebase_helper';
// import { makeSelectPassword } from '../Restuarant/selectors';
import { makeSelectEmail,makeSelectPassword } from './selectors';
// export function loginAPI(url) { 
// 	return fetch(url).then(response => response.json()).then(data => data);
// }
export function loginAPI(url,restData){
	// axios.create('http://khajaorder.com/')
	// return axios.post(url,restData);
	console.log("data from res data",(restData));
	const formData = new FormData();
	
	formData.append("ad_email",restData.ad_email);
	formData.append("ad_password",restData.ad_password);

	return fetch(url,{method:'POST',body:formData}).then(response=>response.json()).then(data=>data);
}
//Initilize firebase
// const fireBaseBackend = getFirebaseBackend();

//If user is login then dispatch redux action's are directly from here.
function* loginUser() {
        try {
				// const history= useHistory();
            	const email= yield select(makeSelectEmail())
				const password= yield select(makeSelectPassword());
				yield put(loginUserLoading());
                const response = yield call(loginAPI, 'https://khajaorder.com/korderapi/login/adminlogin.php', {
				ad_email: email, ad_password: password
				});
				
			
				if(response.success){
                localStorage.setItem("authUser", JSON.stringify(response));
                yield put(loginUserSuccess(response.token));
				
				}
				else{
					// console.log("error",response);
					yield put(loginError("Email or Password is Incorrect!"));
				}
            
            // payload.history.push('/dashboard');
        } catch (error) {
            // yield put(apiError(error));
			console.log("api error",error);
        }
}

// function* logoutUser({ payload: { history } }) {
//     try {
//         localStorage.removeItem("authUser");

//         if (process.env.REACT_APP_DEFAULTAUTH === 'firebase') {
//             const response = yield call(fireBaseBackend.logout);
//             yield put(logoutUserSuccess(response));
//         }

//         history.push('/login');
//     } catch (error) {
//         yield put(apiError(error));
//     }
// }

export function* watchUserLogin() {
    yield takeEvery(LOGIN.SUBMITLOGINDATA, loginUser)
}

// export function* watchUserLogout() {
//     yield takeEvery(LOGOUT_USER, logoutUser)
// }

function* loginSaga() {
    yield all([
        fork(watchUserLogin),
        // fork(watchUserLogout),
    ]);
}

export default loginSaga;