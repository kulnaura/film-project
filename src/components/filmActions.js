import * as sessionActions from './sessionActions';
import { Handlers } from './handlers';


export function getFilmList() {
	console.log("GET FILM LIST func")
	// debugger;
	let data = {
		method: 'GET',
		credentials: 'same-origin',
	};

	return fetch(`http://localhost:8001/api/v1/film`, data)
  		.catch( err => {
  			throw Error(err);
  		})
  		.then(response => Handlers.handleErrors(response.json()))
  		.then(json => {
  			return json;
  		})
}

export function getRentedFilmList() {


    // const formData = {
    // 	"film_id": parseInt(id)
    // };

	let data = {
		method: 'GET',
		credentials: 'same-origin',
		// body: JSON.stringify(formData),
		  headers: {
		    // 'Accept':       'application/json',
		    // 'Content-Type': 'application/json',
		    'Authorization': 'Bearer ' + sessionActions.getToken(),
		  }
	};

	// let data = {
	// 	method: 'GET',
	// 	credentials: 'same-origin',
	// };

	return fetch(`http://localhost:8001/api/v1/rented-film`, data)
  		.catch( err => {
  			throw Error(err);
  		})
  		.then(response => Handlers.handleErrors(response.json()))
  		.then(json => {
  			console.log("RETURN RENTED LIST ->", json)
  			return json;
  		})
}

export function rentFilm(id) {
    const formData = {
    	"film_id": parseInt(id)
    };

	let data = {
		method: 'POST',
		credentials: 'same-origin',
		body: JSON.stringify(formData),
		  headers: {
		    'Accept':       'application/json',
		    'Content-Type': 'application/json',
		    'Authorization': 'Bearer ' + sessionActions.getToken(),
		  }
	};

	console.log('data: =>', data);

	return fetch(`http://localhost:8001/api/v1/film/rent`, data)
  		.catch( err => {
  			throw Error(err);
  		})
  		.then(response => Handlers.handleErrors(response.json()))
  		.then(json => {
  			console.log("AFTER ADDING ->", json)
  			if (json.success) {	
  				return true;
  			}
  		})
}

export function unrentFilm(id) {
    const formData = {
    	"film_id": parseInt(id)
    };

	let data = {
		method: 'POST',
		credentials: 'same-origin',
		body: JSON.stringify(formData),
		  headers: {
		    'Accept':       'application/json',
		    'Content-Type': 'application/json',
		    'Authorization': 'Bearer ' + sessionActions.getToken(),
		  }
	};

	console.log('data: =>', data);

	return fetch(`http://localhost:8001/api/v1/film/finish`, data)
  		.catch( err => {
  			throw Error(err);
  		})
  		.then(response => Handlers.handleErrors(response.json()))
  		.then(json => {
  			console.log("AFTER ADDING ->", json)
  			if (json.success) {	
  				return true;
  			}
  		})
}