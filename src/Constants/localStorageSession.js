export function getLocalStorageData(){
    	const storage=JSON.parse(localStorage.getItem("authUser"));
		return storage.token;

}
export function getPermissions(){ 
	const storage=JSON.parse(localStorage.getItem("authUser"));
	return storage.permission;
}