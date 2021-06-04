// import { all, call, fork, takeEvery, select,put } from "redux-saga/effects";

import { put,all, call, takeLatest,fork } from 'redux-saga/effects';

import {getLocalStorageData} from '../../Constants/localStorageSession';
import { ITEMS } from './constants';
// import {makeSelectItem} from './selectors';

export function setItemsDataAPI(url,formData){
	return fetch(url,{method:'POST',ContentType: 'multipart/form-data',body:formData}).then(response=>response.json()).then(data=>data);
}

export function* saveItemData(action){
	try{
		const data=action.data;
		console.log("from save item api",data)
		const storage=JSON.parse(localStorage.getItem("authUser"));
		const token= storage.token;
		const tokenData=({token:token})
		const allData=Object.assign(tokenData,data);
		const formData=new FormData();
		for (const objData in allData){
			console.log("from item save objdata",objData ,'and',allData[objData]);
			if(objData==="i_image1" ||objData==="i_image2" ||objData==="i_image3" ||objData==="i_image4" ){
				console.log("append in image",objData,"-->",allData[objData][0])
				formData.append(objData,allData[objData][0]);	
			}
			else if(objData==="i_cat_id"){
				let arrCat=[];
				for(const category in allData['i_cat_id']){
					arrCat.push(allData['i_cat_id'][category].value);
				}
				console.log("arrCat",objData,"-->",arrCat);
				formData.append("i_cat_id",arrCat);
			}
			else if(objData==="i_r_id"){
				let arrCat=[];
				for(const category in allData['i_r_id']){
					arrCat.push(allData['i_r_id'][category].value);
				}
				console.log("arrCat",objData,"-->",arrCat);
				formData.append("i_r_id",arrCat);
			}
			else if(objData==="i_r_id"){
				console.log("i am in rage ",data.i_r_id);
				formData.append("i_r_id",data.i_r_id)
			}
			else{
				console.log("appende in else",objData,"-->",allData[objData]);
			    formData.append(objData,allData[objData]);
			}
		}
		// console.log("form data",formData.get('i_cat_id'));
		for (let [key, value] of formData) {
 		 console.log(`from form data ${key}: ${value}`)
			}
		
		yield put({type:ITEMS.SET_ITEMS_DATA_LOADING})
		// console.log("all data",allData)
		const response = yield call(setItemsDataAPI,"https://khajaorder.com/korderapi/items/add.php",formData);
		console.log('res from item get',response);
		if(response.success){
			yield put({type:ITEMS.SET_ITEMS_DATA_SUCCESS})
		}
		else{
			yield put({type:ITEMS.SET_ITEMS_DATA_ERROR,error:"error in data"})
		}
		// yield put({type:ITEMS.GET_RESTUARANT_DATA_API,data:data})
	}
	catch(e){
		yield put({type:ITEMS.SET_ITEMS_DATA_ERROR,error:e})
	}
	
}

// eslint-disable-next-line require-yield
export function* getItem(){
	try{
		const storage=JSON.parse(localStorage.getItem("authUser"));
		const token= storage.token;
		const tokenData=JSON.stringify({token:token})
		yield put({type:ITEMS.GET_ITEMS_DATA_LOADING})
		const response = yield call(setItemsDataAPI,"https://khajaorder.com/korderapi/items/view.php",tokenData);
		console.log('res from item get itema',response);
		yield put({type:ITEMS.GET_ITEMS_DATA_SUCCESS,data:response.data});

	}
	catch(err){
		console.log("error in the url")
	}
}
export function* deleteItemFromAPI(action){
	try{
		const storage=JSON.parse(localStorage.getItem("authUser"));
		const token= storage.token;
		const tokenData=({token:token})
		const id=action.id;
		const allData=JSON.stringify(Object.assign(tokenData,{i_id:id}))
		console.log("all data to delete ",allData)
	
		const response = yield call(setItemsDataAPI,"https://khajaorder.com/korderapi/items/delete.php",allData);
		console.log('res from item delete',response);
		if(response.success){
			yield put({type:ITEMS.DELETE_ITEMS_SUCCESS,id:action.id});
		}
		// yield put({type:ITEMS.GET_ITEMS_DATA_SUCCESS,data:response.data});
	}

	catch(err){
		console.log("error delete item");
	}
}
export function* getItemData(){
	yield takeLatest(ITEMS.GET_ITEMS_DATA,getItem);
}

export  function* saveItem() {
	yield takeLatest(ITEMS.SAVE_ITEMS_CHANGES, saveItemData);
}
export function* deleteItem(){
	yield takeLatest(ITEMS.DELETE_ITEMS, deleteItemFromAPI);
}

export function* editItems(action){
	try{
		// const storage=JSON.parse(localStorage.getItem("authUser"));
		// const token= storage.token;
		const token=yield call(getLocalStorageData());
		const data= action.data;
		const id=action.id;
		const allDat =Object.assign({token:token},data);
		const allData =Object.assign(allDat,{i_id:id});
		const formData=new FormData();
		// formData.append("token",token);

		for (const objData in allData){
			// console.log("from item save objdata",objData ,'and',allData[objData]);
			if(objData==="i_image1" ||objData==="i_image2" ||objData==="i_image3" ||objData==="i_image4" ){
				if(typeof(allData[objData])!=="string"){
					
					
							formData.append(objData,allData[objData][0]);	
				}
				else{
				
				
						formData.append(objData,allData[objData]);	
				}
			
			}
			else if(objData==="category"){
				let arrCat=[];
				for(const category in allData['category']){
					arrCat.push(allData['category'][category].value);
				}
				console.log("arrCat",arrCat);
				formData.append("category",arrCat);
			}
				else if(objData==="i_r_id"){
				let arrCat=[];
				for(const category in allData['i_r_id']){
					arrCat.push(allData['i_r_id'][category].value);
				}
				console.log("arrCat",objData,"-->",arrCat);
				formData.append("i_r_id",arrCat);
			}
			else{
				
			    formData.append(objData,allData[objData]);
			}
		}
	
		// for (let [key, value] of formData) {
 		//  console.log(`from form data ${key}: ${value}`)
		// 	}
		yield put({type:ITEMS.EDIT_ITEMS_API_LOADING});
		const response = yield call(setItemsDataAPI,"https://khajaorder.com/korderapi/items/update.php",formData);
		console.log('res from item edit',response);
		if(response.success){
			yield put({type:ITEMS.EDIT_ITEMS_API_SUCCESS});
		}
		else{
			console.log("error in edit")
		}
		
	}

	catch(err){
		
		yield put({type:ITEMS.EDIT_ITEMS_API_ERROR,error:err});
	}

}
export function* editItem(){
		yield takeLatest(ITEMS.EDIT_ITEMS_API, editItems);
}
export default function* itemsData(){
	yield all([fork(saveItem),fork(getItemData),fork(deleteItem),fork(editItem)]);
}