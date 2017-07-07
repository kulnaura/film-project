import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

import { AuthRequire } from './actions/authActions';

// import all components

import Main from './main';
import Login from './components/login';
import Registration from './components/registration';
import FilmList from './components/filmList';
import RentedFilmList from './components/rentedFilmList';
import FilmDetails from './components/filmDetails';
import RentedFilmDetails from './components/rentedFilmDetails';
import LogOut from './components/logout';
import AddFilm from './components/addFilm';

class Routes extends Component {
    render() {
        return (
            <div className="routes-container">
                <Route exact path="/" component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/registration" component={Registration} />
                <Route path="/films" component={FilmList} />
                <Route path="/rented-films" component={AuthRequire(RentedFilmList)} />
                <Route path="/film" component={FilmDetails} />
                <Route path="/rented-film" component={AuthRequire(RentedFilmDetails)} />
                <Route path="/logout" component={AuthRequire(LogOut)} />
                <Route path="/add-film" component={AuthRequire(AddFilm)} />
            </div>
        );
    }
}

export default Routes;