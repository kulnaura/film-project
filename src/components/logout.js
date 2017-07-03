import React, { Component } from 'react';
import * as sessionActions from './../actions/sessionActions';
import AuthRequire from './../actions/authActions';

class LogOut extends Component {

	componentWillMount() {
    	sessionActions.logOutUser();

    	this.props.history.push('/');
	}

	render() {
		return null;
	}
}

export default LogOut;