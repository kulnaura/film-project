import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import * as filmActions from './../actions/filmActions';
import * as sessionActions from './../actions/sessionActions';
import './../styles/css/film.css';

const FilmListRender = React.createClass({
    render() {
        return (
            <ul className="base-list film-list">
                {this.props.list.map( (film) => {
                    return  <li className="film-list-element" key={ "film_" + film.id }>
                                <FilmListElement value={ film } />
                            </li>
                })}
            </ul>
        )
    }
})

class FilmListElement extends Component{
    constructor(props) {
        super(props);
        this.saveFilmData = this.saveFilmData.bind(this);
    }
    saveFilmData(filmData) {
        sessionActions.saveFilmData(filmData);
    }
    render() {
        let filmElement = this.props.value;
        return (
            <div className="film-element-container">
                <div className="film-element-inner-container">
                    <p className="film-name">
                        <Link to={ "/film" + "?id=" + filmElement.id }
                              onClick={() => {this.saveFilmData(filmElement)}}>{ filmElement.name }</Link>
                    </p>
                    <p className="film-year">{ filmElement.year }</p>
                    { (filmElement.genres)
                        ? <div className="film-genres-container">
                            <p>Genres:</p>
                            <ul className="base-list film-genres-list">
                                { filmElement.genres.map( (genre) => {
                                    return  <li key={"film" + filmElement.id + "_genre_" + genre.id}>
                                                <p className="film-genre-link">{ genre.name }</p>
                                            </li>
                                })}
                            </ul>
                        </div>
                        : null
                    }
                </div>
            </div>
        )
    }
}

class FilmListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        };
      }

    componentDidMount() {
        filmActions.getFilmList()
            .then(json => {
                this.setState({
                    list: json.result,
                });
            });
    }

    render() {
        if (!this.state.list || !Array.isArray(this.state.list)) {
            return (
                <div className="loading">loading ...</div>
            )
        }
        return (
            <div className="films-list-container">
                <FilmListRender list={this.state.list} />
                <div className="page-pagination-container">
                    <div className="pag-left pag-element">Prev</div>
                    <div className="pag-right pag-element">Next</div>
                </div>
            </div>
        )
    }
}

export default FilmListView;