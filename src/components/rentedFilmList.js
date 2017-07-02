import React, { Component } from 'react';
import { Handlers } from './handlers';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import fetch from 'isomorphic-fetch';
import * as filmActions from './filmActions';
import RentedFilmListView from './../views/rentedFilmListView';

import './../styles/film.css';

class RentedFilmList extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	list: null
	    };
  	}

  	componentDidMount() {
  		filmActions.getRentedFilmList()
  			.then(json => {
      			this.setState({
      				 list: json.result,
      			});
  			});
  	}

	render() {
		return (
			<RentedFilmListView list={this.state.list} urlParams={this.urlParams} />
		)
	}
}

export default RentedFilmList;