import * as sessionActions from './sessionActions';
import { Handlers } from './../components/handlers';


export function getFilmList() {
    let data = {
        method: 'GET',
        credentials: 'same-origin',
    };

    return fetch(window.location.protocol + process.env.API_URL + `api/v1/film`, data)
        .catch( err => {
          throw Error(err);
        })
        .then(response => Handlers.handleErrors(response.json()))
        .then(json => {
          return json;
        })
}

export function getRentedFilmList() {

    let data = {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Authorization': 'Bearer ' + sessionActions.getToken(),
        }
    };

    return fetch(window.location.protocol + process.env.API_URL + `api/v1/rented-film`, data)
        .catch( err => {
          throw Error(err);
        })
        .then(response => Handlers.handleErrors(response.json()))
        .then(json => {
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
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionActions.getToken(),
        }
    };

    return fetch(window.location.protocol + process.env.API_URL + `api/v1/film/rent`, data)
        .catch( err => {
            throw Error(err);
        })
        .then(response => Handlers.handleErrors(response.json()))
        .then(json => {
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

    return fetch(window.location.protocol + process.env.API_URL + `api/v1/film/finish`, data)
        .catch( err => {
            throw Error(err);
        })
        .then(response => Handlers.handleErrors(response.json()))
        .then(json => {
            if (json.success) {
                return true;
            }
        })
}

export function addFilm(formData) {
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


    return fetch(window.location.protocol + process.env.API_URL + `api/v1/film`, data)
        .catch( err => {
            throw Error(err);
        })
        .then(response => Handlers.handleErrors(response.json()))
        .then(json => {
            if (json.success) {
                return json;
            }
        })
}