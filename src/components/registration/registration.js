import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { Handlers } from '../handlers';

class Registration extends Component {
	// getInitialState() {
	// 	return {
	// 		username: null,
	// 		password: null,
	// 		login: null,
	// 		age: null,
	// 		telephone: null
	// 	}
	// }

	constructor(props) {
	    super(props);
	    this.onSubmit = this.onSubmit.bind(this);
  	}

  	// handleErrors(response) {
  	// 	if (!response.status) {
  	// 		if (response.message) {
  	// 			throw Warning(response.message);
  	// 		} else {
  	// 			throw Error(response.error);
  	// 		}
  	// 	}
  	// 	return response;
  	// }

	onSubmit(e) {
    	e.preventDefault();
		console.log("click");
		console.log(e);

// get data from refs
	    const formData = {};
	    for (const field in this.refs) {
	      formData[field] = this.refs[field].value;
	    }

	    console.log('-->', formData);
		// check data

		// send data to register function
		formData.age = parseInt(formData.age);
	// phonePattern := regexp.MustCompile(`[0-9\s\+\-\(\)]{5,20}`)
	// var validator = new RegExp('[0-9\s\+\\-\(\)]{5,20}');
 //  	var result = validator.test(formData.telephone);
 //  	console.log('phone result ->', result);
	//patt.test(formData.phone);
	// err = patt.test(formData.phone) ? "Invalid phone number" : err;
		// debugger;
		let data = {
			method: 'POST',
			  credentials: 'same-origin',
			  // mode: 'same-origin',
			body: JSON.stringify(formData),
			  headers: {
			    'Accept':       'application/json',
			    'Content-Type': 'application/json'
			  }
		};

		console.log('data: =>', data);

		return fetch(`http://localhost:8001/auth`, data)
      		.catch( err => {
      			throw Error(err);
      		})
      		.then(response => Handlers.handleErrors(response.json()))
      		.then(json => {
      		})
      debugger;
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<ul>
					<li><input ref="username" type="text" name="username" defaultValue="username01" /></li>
					<li><input ref="password" type="password" name="password" defaultValue="pass01" /></li>
					<li><input ref="login" type="text" name="login" defaultValue="login01" /></li>
					<li><input ref="age" type="number" name="age" defaultValue="32" /></li>
					<li><input ref="telephone" type="tel" name="telephone" pattern="[0-9\s\+\-\(\)]{5,20}" /></li>
					</ul>
					<button type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default Registration;