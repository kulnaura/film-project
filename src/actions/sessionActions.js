export function logOutUser() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('authTime');
    sessionStorage.removeItem('user');

    sessionStorage.removeItem('filmDetails');
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

export function filmDetailsCheck() {
    // sessionStorage.clear();
    if(!sessionStorage.getItem('filmDetails')) {
        let filmDetails = {};
        sessionStorage.setItem('filmDetails', JSON.stringify(filmDetails));
    }
}

export function saveFilmData(filmData) {
    filmDetailsCheck();

    sessionStorage.setItem('filmDetails', JSON.stringify(filmData));
}

export function getFilm(id) {
    let filmDetais = JSON.parse(sessionStorage.getItem('filmDetails'));

    return filmDetais.id == id ? filmDetais : null;
}