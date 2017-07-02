import React, { Component } from 'react';
import * as sessionActions from './sessionActions';
import AuthRequire from './authActions';

class LogOut extends Component {
	// constructor(props) {
	//     super(props);
	//     // this.onSubmit = this.onSubmit.bind(this);
 //  	}

	componentWillMount() {
		console.log("Logout mounted")
		console.log(this.props)
		console.log(this)
    	sessionActions.logOutUser();
    	// AuthRequire(this);

    	// REDIRECT FROM LOGOUT to SOME OTHER PLACE
    	this.props.history.push('/');

	}

	render() {
		return null;
	}
}

export default LogOut;