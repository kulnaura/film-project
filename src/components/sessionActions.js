// import * from 'actionsTypes'

// export 

export function logOutUser() {
	sessionStorage.removeItem('jwt');
	sessionStorage.removeItem('authTime');
	sessionStorage.removeItem('user');
	return 'LOG_OUT'; // set this as const in actionsTypes
	// like: export const LOG_OUT = 'LOG_OUT';
}

export function checkAuth() {
	return sessionStorage.getItem('jwt') ? true : false;
}

export function getToken() {
	return sessionStorage.getItem('jwt');
}