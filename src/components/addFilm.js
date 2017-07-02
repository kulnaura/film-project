import React, { Component } from 'react';
import { Handlers } from './handlers';
import fetch from 'isomorphic-fetch';
import * as sessionActions from './sessionActions';
import './../styles/addFilm.css';

// const ResultMessage = React.createClass({
// 	render() {
// 		return (
// 				{(this.props.status != "") 
// 					? <div className="result">
// 						<div className="result-container">
// 							<p>{this.props.status}</p>
// 						</div>
// 					</div>
// 					: null
// 				}
// 		)
// 	}
// });

class AddFilm extends Component {
	constructor(props) {
	    super(props);
	    this.onSubmit = this.onSubmit.bind(this);
	    this.state = {
	    	status: false,
	    	statusMessage: "",
	    }
  	}

  	componentDidMount() {
  		if (this.state.status) {
  			// ?
  		}
  	}

  	setStatus(message) {
		this.setState({
			status: true,
			statusMessage: message
		});
		setTimeout(() => {
			// clear state
			this.setState({
				status: false,
				statusMessage: ""
			});
		}, 5000);
  	}

	onSubmit(e) {
    	e.preventDefault();
		console.log("click");
		console.log(e);
		console.log(this)

	    const formData = {};
	    for (const field in this.refs) {
	      formData[field] = this.refs[field].value;
	    }
	    if (formData.name == "") {
	    	this.setStatus("Add film name");
	    	document.getElementById("name").focus();
	    	return false;
	    }
	    if (formData.year == "" || !formData.year.match(/\d/g)) {
	    	this.setStatus("Add rigth year");
	    	document.getElementById("year").focus();
	    	return false;
	    }
	    if (formData.genres == "") {
	    	this.setStatus("Add genres 1, 2 or/and 3");
	    	document.getElementById("genres").focus();
	    	return false;
	    }
		formData.year = parseInt(formData.year);

	    console.log('-->', formData);
	    let genres = formData.genres;
	    console.log("Genres ->", genres);
	    genres = genres.replace(/[\s\.\;\,]+/g, ",");
	    console.log(genres)
	    genres = genres.split(",");
	    console.log(genres)


	    function uniqIntArray(array) {
			var result = [];
			array.forEach(function(item) {
	    		if(result.indexOf(item) < 0) {
	        		result.push(parseInt(item));
	     		}
			});
			return result;
	    }


	    genres = uniqIntArray(genres);
	    console.log("genres result ->", genres)

	    formData.genres = genres;

	    console.log(JSON.stringify(formData))
	    	
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

		console.log('data: =>', data);

		return fetch(`http://localhost:8001/api/v1/film`, data)
      		.catch( err => {
      			throw Error(err);
      		})
      		.then(response => Handlers.handleErrors(response.json()))
      		.then(json => {
      			console.log("AFTER ADDING ->", json)
      			if (json.success) {	
				    for (const field in this.refs) {
				      this.refs[field].value = "";
				    }
				    this.setStatus("Film was added successfully");
      			}
      		})
      debugger;
	}

	render() {
		return (
			<div className="add-film-container">
				<div className="add-film-form-container">
					<div className="form-caption">
						<p>Add film form</p>
					</div>
					<div className="add-film-form">
						<form onSubmit={this.onSubmit}>
							<ul className="base-list add-film-form-list">
								<li>
									<p className="element-caption">Film name:</p>
									<input className="form-input" ref="name" type="text" name="name" id="name"/>
								</li>
								<li>
									<p className="element-caption">Film year:</p>
									<input className="form-input" ref="year" type="number" name="year" id="year" />
								</li>
								<li>
									<p className="element-caption">Film genres ids:</p>
									<p className="element-advice">(Genders contains numbers from 1 to 3, like: 1, 3)</p>
									<input className="form-input" ref="genres" type="text" name="genres" id="genres" pattern="[0-9\s\\,\\.\\;]+" />
								</li>
								<li>
									<button className="form-submit-button" type="submit">Add film</button>
								</li>
							</ul>
						</form>
					</div>
				</div>
				{(this.state.status) 
					? <div className="result">
						<div className="result-container">
							<p>{this.state.statusMessage}</p>
						</div>
					</div>
					: null
				}
			</div>
		)
	}
}

export default AddFilm;