import React, { Component } from 'react';
import Handlers from './handlers';
// import * as sessionActions from '../sessionActions';
const CONST_EXP = 72*3600*1000;

class Auth extends Component {
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

	onSubmit(e, p) {
    	e.preventDefault();
		console.log("click");
		console.log(e);
		console.log(p);

	// get data from refs
	    const formData = {};
	    for (const field in this.refs) {
	      formData[field] = this.refs[field].value;
	    }

	    console.log('-->', formData);
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

		let user = formData.login;

		console.log('data: =>', data);

		return fetch(`http://localhost:8001/login`, data)
      		.then(response => response.json())
      		.then(response => Handlers.handleErrors(response))
      		.then(json => {
      			if (json.token) {
      				console.log("we have token")
      				console.log("and we need to save this token to some store")
      				// save to store
      				sessionStorage.setItem('jwt', json.token);
      				// sessionStorage.setItem('exp', json.exp ? json.exp : )
      				var t = new Date().getTime();
      				console.log(t)
      				sessionStorage.setItem('authTime', t)
      				sessionStorage.setItem('user', user)
      				console.log(sessionStorage)
      				console.log(this)
      				// default redirect after login
					this.props.history.push('/');
      				// so we can add function that update our session and call login func before we unlogged
      			}
  			})
      		.catch( err => {
      			console.log("catch: ",err)
      			// throw Error(err);
      		})
      debugger;
	}

	render() {
		return (
			<div>
				<div>Login component</div>
				<form onSubmit={this.onSubmit}>
					<ul className="base-list">
						<li>
							<input className="form-input" ref="login" type="text" name="login" defaultValue="login01" />
						</li>
						<li>
							<input className="form-input" ref="password" type="password" name="password" defaultValue="pass01" />
						</li>
					</ul>
					<button className="form-submit-button" type="submit">Submit</button>
				</form>
			</div>
		)
	}
}

export default Auth;