import React, { Component } from 'react';
import { Handlers } from './handlers';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import * as filmActions from './filmActions';
import FilmListView from './../views/filmListView';

import './../styles/film.css';

class FilmList extends Component {
	constructor(props) {
		console.log("CALL FILM LIST constructor")
	    super(props);
	    this.state = {
	    	list: null
	    };
	    this.urlParams = {
	    	url: "/film"
	    }
  	}

  	componentDidMount() {
  		console.log("CALL FILM LIST")
  		filmActions.getFilmList()
  			.then(json => {
      			this.setState({
      				 list: json.result,
      			});
  			});
  	}

	render() {
		return (
			<FilmListView list={this.state.list} urlParams={this.urlParams} />
		)
	}
}

export default FilmList;