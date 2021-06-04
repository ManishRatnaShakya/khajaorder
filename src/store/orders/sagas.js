// import { all, call, fork, takeEvery, select,put } from "redux-saga/effects";

import { put,all, call, takeLatest,fork,select } from 'redux-saga/effects';


import { ORDERS } from './constants';
// import {makeSelectOrderStatus} from './selectors';
// import { deleteItem } from './../Items/actions';
import {makeSelectOrderId} from './selectors';



export function setDataAPI(url,formData){
	// return fetch(url,{method:'POST', body:formData}).then(response=>response.json()).then(data=>data);
	return fetch(url,{method:'POST',body:formData}).then(response=>response.json()).then(data=>data);
}
export function getDataAPI(url,formData){
	// return fetch(url,{method:'POST', body:formData}).then(response=>response.json()).then(data=>data);
	return fetch(url).then(response=>response.json()).then(data=>data);
}
export function* saveData(action){
	try{
				const data=action.data;
				console.log("from saga real ",data);
				
				const storage=JSON.parse(localStorage.getItem("authUser"));
				
				const token= storage.token;
				console.log("tokem",token);
				const formData = new FormData();
				formData.append("cat_image",data.cat_image);
				formData.append("cat_name",data.cat_name);
				formData.append("token",token);
			
				const allData= JSON.stringify(Object.assign({token:token},data));
			
				yield put({type:ORDERS.SET_DATA_LOADING});
				const response = yield call(setDataAPI,"https://khajaorder.com/korderapi/category/add.php",formData)
				console.log("res outside",response);
				if(response.success){
					console.log("response from category add ",response)
					yield put({type:ORDERS.SET_DATA_SUCCESS});
				}
				else {
					yield put({type:ORDERS.SET_DATA_ERROR,error:"Error in the Email"});	
				}
				
			}	
			catch(err){
				yield put({type:ORDERS.SET_DATA_ERROR,error:err.message});
			}
}

// eslint-disable-next-line require-yield
export function* getOrder(){
	try{
		const storage=JSON.parse(localStorage.getItem("authUser"));
		const token= storage.token;
		
		yield put({type:ORDERS.GET_ORDER_DATA_LOADING})
		const response = yield call(getDataAPI,`https://khajaorder.com/korderapi/orders/view.php?token=${token}`);
		console.log('res from get order',response);
		const data = response.data;
		yield put({type:ORDERS.GET_ORDER_DATA_SUCCESS,data:data})
	}
	catch (e) {
		 yield put({type:ORDERS.GET_ORDER_DATA_ERROR,error:e.message});
	}
	
}

export function* getOrderData(){

	yield takeLatest(ORDERS.GET_ORDER_DATA_API,getOrder);
}

// export  function* saveCategory() {
// 	yield takeLatest(ORDERS.SET_CATEGORY_DATA_API, saveData);
// }
// export function* deleteData(action){
// 		try{
// 		const storage=JSON.parse(localStorage.getItem("authUser"));
// 		const token= storage.token;
// 		const tokenData={token:token}
// 		const deleteId = {id:action.id};
// 		const allData=JSON.stringify(Object.assign(tokenData,deleteId))
// 		console.log("delete data sga",allData)
// 		const response = yield call(setDataAPI,"https://khajaorder.com/korderapi/category/delete.php",allData);
// 		console.log('res delelte get',response);
		
// 		if(response.success){
// 			yield put({type:ORDERS.DELETE_CATEGORY_SUCCESS,id:action.id})
// 		}
// 		else{
// 			console.log("delete failed");
// 		}
// 	}
// 	catch(err){
// 			yield put({type:ORDERS.DELETE_CATEGORY_ERROR,error:err.message})
// 	}
	

// }
// export function* deleteCategory(){
// 	yield takeLatest(ORDERS.DELETE_CATEGORY, deleteData);
// }
export function* editOrderStatus(action) {
	try{
	console.log("edit",action);
	const storage=JSON.parse(localStorage.getItem("authUser"));
	const token= storage.token;
	const id = action.id;
	const data = action.status;
	console.log("token",token);
	const formData = new FormData();
	formData.append("token",token);
	formData.append("o_common_id",id);
	formData.append("cart_status",data);
	
	const response = yield call(setDataAPI,"https://khajaorder.com/korderapi/orders/update.php",formData);
	if(response.success){
		yield put({type:ORDERS.ORDER_STATUS_UPDATE_SUCCESS,order:response.order})
	}

	console.log("response order",response);
	}
	catch(err){

	}
	 
}
export function* editOrder(){
	yield takeLatest(ORDERS.ORDER_STATUS_UPDATE,editOrderStatus)
}
export default function* orderData(){
	yield all([fork(getOrderData),fork(editOrder)]);
}