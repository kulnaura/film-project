import React, { Component } from 'react';
import queryString from 'query-string';
import * as sessionActions from './sessionActions';
import * as FilmActions from './filmActions';

class FilmList extends Component {
	// constructor(props) {
	//     super(props);
 //  	}

  	componentWillMount() {
  		// this.getFilm();
  		console.log("THIS IS ->",this);
  		console.log(this.props.location.search)
  		this.filmDetails = queryString.parse(this.props.location.search);
  		this.filmDetails.genres = JSON.parse(this.filmDetails.genres);
  		console.log(this.filmDetails)
  		console.log(this.filmDetails.genres)
  		if(!this.filmDetails.genres) {
  			this.filmDetails.genres = [];
  		}
  	}

  	unrentFilm = () => {
  		if (this.filmDetails.id) {
  			console.log(FilmActions.unrentFilm(this.filmDetails.id))
  		} else {
  			console.log("FILM HAVE NO ID")
  		}
  	}
	

	render() {
		return (
			<div>
				<div>Film detail</div>
				<p>{this.filmDetails.id}</p>
				<p>{this.filmDetails.name}</p>
				<p>{this.filmDetails.year}</p>
				<div>
					<p>Genres:</p>
					<ul>
						{this.filmDetails.genres.map((genre) => {
							return <li key={"film"+this.filmDetails.id+"_genre_"+genre.id}><p>{genre.name}</p></li>
						})}
					</ul>
				</div>
				{ sessionActions.checkAuth() === true 
					? <button onClick={this.unrentFilm}>Unrent film</button>
					: null
				}
			</div>
		)
	}
}

export default FilmList;