import React, { Component } from 'react';
import queryString from 'query-string';
import * as sessionActions from './../actions/sessionActions';
import * as filmActions from './../actions/filmActions';
import './../styles/css/filmDetails.css';

class FilmDetails extends Component {
    constructor(props) {
        super(props);
        this.filmDetails = {};
        this.filmDetails.genres = [];
    }

    componentWillMount() {
        const getData = queryString.parse(this.props.location.search);
        this.filmDetails = sessionActions.getFilm(getData.id);
    }

    rentFilm = () => {
        if (this.filmDetails.id) {
            console.log(filmActions.rentFilm(this.filmDetails.id))
        } else {
            console.log("FILM HAVE NO ID")
        }
    }


    render() {
        return (
            <div className="film-details-container">
                <div className="page-header">
                    <div className="page-caption">
                        <p>Film details page</p>
                    </div>
                </div>
                <div className="film-details">
                    <div className="film-details-header-container">
                        <p className="film-details-header">Film details</p>
                    </div>
                    <ul className="base-list film-details-list">
                        <li className="film-details-list-element">
                            <p className="film-details-caption">Film id:</p>
                            <p className="film-details-data">{this.filmDetails.id}</p>
                        </li>
                        <li className="film-details-list-element">
                            <p className="film-details-caption">Film name:</p>
                            <p className="film-details-data">{this.filmDetails.name}</p>
                        </li>
                        <li className="film-details-list-element">
                            <p className="film-details-caption">Film year:</p>
                            <p className="film-details-data">{this.filmDetails.year}</p>
                        </li>
                        <li className="film-details-list-element">
                            <p className="film-details-caption">Genres:</p>
                            <ul className="base-list film-details-genres-list">
                                {this.filmDetails.genres.map((genre) => {
                                    return <li className="film-detail-genre-element" key={"film"+this.filmDetails.id+"_genre_"+genre.id}><p className="film-details-genre">{genre.name}</p></li>
                                })}
                            </ul>
                        </li>
                    </ul>
                    { sessionActions.checkAuth() === true
                        ? <button className="form-submit-button" onClick={this.rentFilm}>Rent film</button>
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default FilmDetails;