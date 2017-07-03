export function logOutUser() {
	sessionStorage.removeItem('jwt');
	sessionStorage.removeItem('authTime');
	sessionStorage.removeItem('user');
	return true;
}

export function checkAuth() {
	return sessionStorage.getItem('jwt') ? true : false;
}

export function getToken() {
	return sessionStorage.getItem('jwt');
}

export function getCurrentUserLogin() {
	return sessionStorage.getItem('user');
}