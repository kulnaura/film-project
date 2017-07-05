import React, { Component } from 'react';
import Handlers from './../components/handlers';
import * as sessionActions from './sessionActions';

export function AuthRequire(Component) {
    class AuthComponent extends Component {
        componentWillMount() {
            this.checkAndRedirect();
        }

        componentWillReceiveProps() {
            this.checkAndRedirect();
        }

        checkAndRedirect() {
            if (!sessionActions.checkAuth()) {
                this.props.history.push('/auth');
            }
        }

        render() {
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

export function login(params, component) {
    let formData = {};
    formData.login = params.login;
    formData.password = params.password;

    let data = {
        method: 'POST',
        credentials: 'same-origin',
        body: JSON.stringify(formData),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    let user = formData.login;

    return fetch(process.env.API_URL, data)
    // return fetch(`http://localhost:8001/login`, data)
        .then(response => response.json())
        .then(response => Handlers.handleErrors(response))
        .then(json => {
            if (json.token) {
                sessionStorage.setItem('jwt', json.token);
                var t = new Date().getTime();
                sessionStorage.setItem('authTime', t)
                sessionStorage.setItem('user', user)
                component.props.history.push('/');
            }
        })
        .catch(err => {
            console.log(err)
        })
}