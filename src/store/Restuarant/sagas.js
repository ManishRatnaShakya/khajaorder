// import { all, call, fork, takeEvery, select,put } from "redux-saga/effects";

import { put,all, call, takeLatest, select,fork } from 'redux-saga/effects';
import {addRestuarantAPI} from "../../Constants/apiUrl";

import { RESTUARANTS } from './constants';
// import {makeSelectRestaunt} from './selectors';
// import axios from 'axios';
// import actions from 'redux-form/lib/actions';
export function getRestuarantDataAPI(url) { 
	return fetch(url).then(response => response.json()).then(data => data);
}
export function setRestuarantDataAPI(url,formData){
	// axios.create('http://khajaorder.com/')
	// return axios.post(url,restData);
	// console.log("data from res data",restData);
	
	return fetch(url,{
		method:'POST',
	ContentType:'multipart/form-data',
	body:formData}).then(response=>response.json()).then(data=>data);
}

export function* saveData(action){
	try{
				const data=action.data;
				console.log("from saga real ",data);
				
				const storage=JSON.parse(localStorage.getItem("authUser"));
				
				const token= storage.token;
				const allData= Object.assign({token:token},data);
				const formData = new FormData();
				for (const objData in allData){
					console.log("from objdata",allData[objData])
					if(objData==="r_logo"||objData==="r_cover"){
						console.log("from objdata",allData[objData][0])
						formData.append(objData,allData[objData][0])
					}
					else{
					formData.append(objData,allData[objData]);
					}
				}
				// formData.append("r_logo",allData.r_logo[0]);
				// formData.append("r_cover",allData.r_cover[0])
				// const allData= JSON.stringify();
				console.log("all data",allData)
				yield put({type:RESTUARANTS.SET_DATA_LOADING});
				const response = yield call(setRestuarantDataAPI,"https://khajaorder.com/korderapi/resturants/add.php",formData)
				if(response.success){
					console.log("response",response)
					yield put({type:RESTUARANTS.SET_DATA_SUCCESS,setSuccess:response.success});
				}
				else {
					yield put({type:RESTUARANTS.SET_DATA_ERROR,error:"Error in the Email"});	
				}
				
			}	
			catch(err){
				yield put({type:RESTUARANTS.SET_DATA_ERROR,error:err.message});
			}
}

// eslint-disable-next-line require-yield
export function* getRestuarant(){
	try{
		const storage=JSON.parse(localStorage.getItem("authUser"));
		const token= storage.token;
		const tokenData=JSON.stringify({token:token})
		yield put({type:RESTUARANTS.GET_RESTUARANT_DATA_API_LOADING})

		const response = yield call(setRestuarantDataAPI,"https://khajaorder.com/korderapi/resturants/view.php",tokenData);
		console.log('res from get',response);
		const data = response.data;
		yield put({type:RESTUARANTS.GET_RESTUARANT_DATA_API,data:data})
	}
	catch(err){
			yield put({type:RESTUARANTS.GET_RESTUARANT_DATA_API,error:err.message})
	}
}

export function* deleteRestuarantData(action){
	try{
		const storage=JSON.parse(localStorage.getItem("authUser"));
		const token= storage.token;
		
		const data={r_id:action.id}
		console.log("delete id",data);
		const allData= JSON.stringify(Object.assign({token:token},data));
		// yield put({type:RESTUARANTS.GET_RESTUARANT_DATA_API_LOADING})
		console.log("from delete data",allData)
		const response = yield call(setRestuarantDataAPI,"https://khajaorder.com/korderapi/resturants/delete.php",allData);
		console.log('res from delete',response);
		// const data = response.data;
		if(response.success){
			yield put({type:RESTUARANTS.DELETE_RESTUARANTS_SUCCESS,id:action.id})
		}
		else{
			console.log("delete failed");
		}
	}
	catch(err){
			// yield put({type:RESTUARANTS.GET_RESTUARANT_DATA_API,error:err.message})
			console.log("delete errror",err)
	}
}

export function* getRestuarantData(){
	yield takeLatest(RESTUARANTS.GET_RESTUARANT_DATA,getRestuarant);
}

export  function* saveRestuarant() {
	yield takeLatest(RESTUARANTS.SAVE_CHANGES, saveData);
}
export function* deleteRestuarant(){
	yield takeLatest(RESTUARANTS.DELETE_RESTUARANTS,deleteRestuarantData)
}

export function* editRestuarant(action){
	try{
				const data=action.data;
				console.log("from saga real ",data);
				
				const storage=JSON.parse(localStorage.getItem("authUser"));
				
				const token= storage.token;
				const allDat= Object.assign({token:token},data);
				const allData=Object.assign(allDat,{r_id:action.id});
				
				console.log("all data",allData)
				const formData = new FormData();
				for (const objData in allData){
					console.log("from objdata",allData[objData])
					if(objData==="r_logo"){
						if(typeof(allData[objData])!=="string"){
							formData.append(objData,allData[objData][0]);	
						}
						else{
							formData.append(objData,allData[objData]);	
						}
					
					}
					else if(objData==="r_cover"){
						if(typeof(allData[objData])!=="string"){
							formData.append(objData,allData[objData][0]);	
						}
						else{
							formData.append(objData,allData[objData]);	
						}
					
					}
					else if(objData==="r_name" ||objData==="r_tagline" ||objData==="r_contact1" ||objData==="r_contact2" ||objData==="r_streetname" ||objData==="r_city" ||objData==="r_state" ||objData==="r_zipcode" ||objData==="r_available" ||objData==="r_description" ||objData==="r_ad_id" ||objData==="r_id" ||objData==="rd_id" ||objData==="rd_r_id" ||objData==="rd_gmap_code"||objData==="rd_w_link"||objData==="rd_y_link"||objData==="rd_i_link"||objData==="rd_f_link"){
						if(allData[objData]!==""){
						formData.append(objData,allData[objData]);
						}
						else{
							formData.append(objData,"");
						}
					}
					else{
					// formData.append(objData,allData[objData]);
					console.log("nothing");
					}
				}

				for (let [key, value] of formData) {
 				 console.log(`from form data ${key}: ${value}`)
					}
				
				// console.log("all data",allData)
				yield put({type:RESTUARANTS.EDIT_RESTUARANTS_API_LOADING});
				const response = yield call(setRestuarantDataAPI,"https://khajaorder.com/korderapi/resturants/update.php",formData)
				console.log("response",response)
				if(response.success){
					console.log("response",response)
					yield put({type:RESTUARANTS.EDIT_RESTUARANTS_API_SUCCESS});
				}
				else {
					yield put({type:RESTUARANTS.EDIT_RESTUARANTS_API_ERROR,error:"Error in the Email"});	
				}
				
			}	
			catch(err){
				yield put({type:RESTUARANTS.EDIT_RESTUARANTS_API_ERROR,error:err.message});
			}
	
}
export function* editRestuarantData(){
	yield takeLatest(RESTUARANTS.EDIT_RESTUARANTS_API,editRestuarant)
}

export default function* restuarantData(){
	yield all([
		fork(saveRestuarant),
		fork(getRestuarantData),
		fork(deleteRestuarant),
		fork(editRestuarantData)]);
}