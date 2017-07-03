import React, { Component } from 'react';
import { Handlers } from './handlers';
import fetch from 'isomorphic-fetch';
import * as filmActions from './../actions/filmActions';
import FilmListView from './../views/filmListView';

import './../styles/film.css';

class FilmList extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	list: null
	    };
  	}

  	componentDidMount() {
  		filmActions.getFilmList(this.urlParams)
  			.then(json => {
      			this.setState({
      				 list: json.result,
      			});
  			});

  	}

	render() {
		return (
			<FilmListView list={this.state.list} />
		)
	}
}

export default FilmList;