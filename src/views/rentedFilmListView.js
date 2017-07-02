import React, { Component } from 'react';
import { Handlers } from './../components/handlers';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import * as filmActions from './../components/filmActions';

import './../styles/film.css';

const FilmListRender = React.createClass({
  		render() {
  			return (
				<ul className="film-list">
					{this.props.list.map( (film) => {
						return 	<li className="film-list-element" key={ "film_" + film.id }>
									<FilmListElement value={ film } />
								</li>
					})}
				</ul>
  			)
  		}
  	})

const FilmListElement = React.createClass({
	render() {
		let filmElement = this.props.value;
		return (
			<div className="film-element-container">
				<p className="film-name">
					<Link to={ "/rented-film?id=" + filmElement.id +
							"&name=" + filmElement.name +
							"&year=" + filmElement.year +
							"&genres=" + JSON.stringify(filmElement.genres) }>{ filmElement.name }</Link>
				</p>
				<p className="film-year">{ filmElement.year }</p>
				{ (filmElement.genres) 
					? <ul className="film-genres-list">
						{ filmElement.genres.map( (genre) => {
							return 	<li key={"film" + filmElement.id + "_genre_" + genre.id}>
										<p>{ genre.name }</p>
									</li>
						})}
					</ul> 
					: null
				}
			</div>
		)
	}
})


class RentedFilmListView extends Component {
	constructor(props) {
		console.log("Call constructor")
	    super(props);
	    this.state = {
	    	list: null,
	    	loading: true,
	    };
  	}

  	componentDidMount() {
  		filmActions.getRentedFilmList()
  			.then(json => {
      			this.setState({
      				 list: json.result,
      				 loading: false
      			});
  			});
  	}

	render() {
		if ((!this.state.list || !Array.isArray(this.state.list)) && this.state.loading) {
			return (
				<div className="loading">loading ...</div>
			)
		}
		if (!this.state.list && !this.state.loading) {
			return (
				<div className="films-list-container">Rented list is empty</div>
			)
		}
		console.log("list ", this)
		return (
			<div className="films-list-container">
				<FilmListRender list={this.state.list} />
				<div className="pagination-container">
					<div className="pag-left pag-element">Prev</div>
					<div className="pag-right pag-element">Next</div>
				</div>
			</div>
		)
	}
}

export default RentedFilmListView;