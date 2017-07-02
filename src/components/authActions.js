import React, { Component } from 'react';
import * as sessionActions from './sessionActions';

function AuthRequire(Component) {
	class AuthComponent extends Component {
		componentWillMount() {
			this.checkAndRedirect();
		}

		componentWillReceiveProps() {
			this.checkAndRedirect();
		}

		checkAndRedirect() {
			if (!sessionActions.checkAuth()) {
				console.log("REDIRECT TO /auth")
				this.props.history.push('/auth');
				console.log("this inside => ", this)
			}
		}

		render() {
			console.log("AUTH RENDER")
			return (
				<div>
					{sessionActions.checkAuth() === true
						? <Component {...this.props}/> 
						: null
					}
				</div>
			)
		}
	}

	return AuthComponent;
}

export default AuthRequire;