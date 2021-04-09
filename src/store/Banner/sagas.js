// import { all, call, fork, takeEvery, select,put } from "redux-saga/effects";

import { put,all, call, takeLatest, select,fork } from 'redux-saga/effects';


import { CATEGORY } from './constants';
import { BANNER } from './constants';
import {makeSelectCategory} from './selectors';
import { deleteItem } from './../Items/actions';
import axios from 'axios';


export async function  setRestuarantDataAPI(url,formData){
	return fetch(url,{
		method:'POST',
		ContentType: 'multipart/form-data',
		body:formData
	})
		.then(response=>response.json())
		.then(data=>data);
	
}
// export function* saveData(action){
// 	try{
// 				const data=action.data;
								
// 				const storage=JSON.parse(localStorage.getItem("authUser"));
// 				console.log("data",data.cat_image);
// 				const token= storage.token;
// 				const formData = new FormData();
// 				console.log("token",token);
// 				formData.append("token",token);
// 				if(data.cat_image[0].path){
// 					console.log("from delete add data category")
// 				formData.append("cat_image",data.cat_image[0]);
// 				}
// 				else{
// 					yield put({type:CATEGORY.SET_DATA_ERROR,error:"Error in the Email"});
// 				}
// 				formData.append("cat_name",data.cat_name);		
// 				yield put({type:CATEGORY.SET_DATA_LOADING});
// 				const response = yield call(setRestuarantDataAPI,"https://khajaorder.com/korderapi/category/add.php",formData)
// 				console.log("res outside",response);
// 				if(response.success){
// 					console.log("response from category add ",response)
// 					yield put({type:CATEGORY.SET_DATA_SUCCESS});
// 				}
// 				else {
// 					yield put({type:CATEGORY.SET_DATA_ERROR,error:"Error in the Email"});	
// 				}
				
// 			}	
// 			catch(err){
// 				yield put({type:CATEGORY.SET_DATA_ERROR,error:err.message});
// 			}
// }

// eslint-disable-next-line require-yield
export function* getBanner(){
	try{
		const storage=JSON.parse(localStorage.getItem("authUser"));
		const token= storage.token;
		const formData = new FormData();
		formData.append("token",token);
		
		const response = yield call(setRestuarantDataAPI,"https://khajaorder.com/korderapi/banners/view.php",formData);
		console.log('res from get',response);
		const data = response.data;
		yield put({type:BANNER.GET_BANNER_DATA_SUCCESS,data:data})
	}
	catch(err){
			yield put({type:BANNER.GET_BANNER_DATA_ERROR,error:err.message})
	}
	
}

export function* getBannerData(){

	yield takeLatest(BANNER.GET_BANNER_DATA_API,getBanner);
}

// export  function* saveCategory() {
// 	yield takeLatest(CATEGORY.SET_CATEGORY_DATA_API, saveData);
// }
// export function* deleteData(action){
// 		try{
// 		const storage=JSON.parse(localStorage.getItem("authUser"));
// 		const token= storage.token;
// 		console.log("from deleteData",action.id,token);
// 		const formData = new FormData();
// 		formData.append("token",token);
	
// 		formData.append("cat_id",action.id);

// 		// const tokenData={token:token};

// 		// const deleteId = {id:action.id};
// 		// const allData=JSON.stringify(Object.assign(tokenData,deleteId))
// 		// console.log("delete data sga",allData)
// 		const response = yield call(setRestuarantDataAPI,"https://khajaorder.com/korderapi/category/delete.php",formData);
// 		console.log('res delelte get',response);
		
// 		if(response.success){
// 			yield put({type:CATEGORY.DELETE_CATEGORY_SUCCESS,id:action.id})
// 		}
// 		else{
// 			console.log("delete failed");
// 		}
// 	}
// 	catch(err){
// 			yield put({type:CATEGORY.DELETE_CATEGORY_ERROR,error:err.message})
// 	}
	

// }
// export function* deleteCategory(){
// 	yield takeLatest(CATEGORY.DELETE_CATEGORY, deleteData);
// }

// export  function* editCategoryApi(action){
// 	console.log("actions",action);
// 	try{
// 				const data=action.data;
// 				const id= action.id;				
// 				const storage=JSON.parse(localStorage.getItem("authUser"));
// 				console.log("edit data",data);
// 				const token= storage.token;
// 				const formData = new FormData();
// 				formData.append("token",token);
// 				formData.append("cat_id",id);
// 				formData.append("cat_name",data.cat_name);
// 				if(typeof(data.cat_image)!=="string"){
// 					console.log("we have send",data.cat_image[0]);
// 						formData.append("cat_image",data.cat_image[0]);
// 				}
// 				else{
// 					formData.append("cat_image",data.cat_image);
// 				}
				
// 				// if(typeof(data.cat_image)!=="string"){
// 				// 	if(data.cat_image[0].path){
// 				// 		console.log("from edit add data category")
// 				// 		formData.append("cat_image",data.cat_image[0]);
// 				// 	}
// 				// }
// 				// else{
// 				// 	yield put({type:CATEGORY.EDIT_CATEGORY_ERROR,error:"Error in the Email"});
// 				// }
// 				// formData.append("cat_name",data.cat_name);		
// 				yield put({type:CATEGORY.EDIT_CATEGORY_LOADING});
// 				const response = yield call(setRestuarantDataAPI,"https://khajaorder.com/korderapi/category/edit.php",formData)
// 				console.log("res outside",response);
// 				if(response.success){
// 					console.log("response from category edit ",response)
// 					yield put({type:CATEGORY.EDIT_CATEGORY_SUCCESS});
// 				}
// 				else {
// 					yield put({type:CATEGORY.EDIT_CATEGORY_ERROR,error:"Error in the Email"});	
// 				}
				
// 			}	
// 			catch(err){
// 				yield put({type:CATEGORY.EDIT_CATEGORY_ERROR,error:err.message});
// 			}

// }
// export function* editCategory(){
// 	yield takeLatest(CATEGORY.EDIT_CATEGORY_API,editCategoryApi);
// }
export default function* bannerDataAPI(){
	yield all([
		// fork(saveCategory),
		fork(getBannerData),
		// fork(deleteCategory),
		// fork(editCategory)
	]);
}