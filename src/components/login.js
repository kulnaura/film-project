import React, { Component } from 'react';
import { login } from './../actions/authActions';
import './../styles/css/login.css';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const formData = {};
        for (const field in this.refs) {
            formData[field] = this.refs[field].value;
        }

        login(formData, this);
    }

    render() {
        return (
            <div className="login-container">
                <div className="page-header">
                    <div className="page-caption">
                        <p>Login page</p>
                    </div>
                </div>
                <div className="login-form-container">
                    <div className="form-caption">
                        <p>Login form</p>
                    </div>
                    <div className="login-form">
                        <form onSubmit={this.onSubmit}>
                            <ul className="base-list login-form-list">
                                <li>
                                    <p className="element-caption">Login:</p>
                                    <input className="form-input" ref="login" type="text" name="login" defaultValue="login01" placeholder="Enter your login" />
                                </li>
                                <li>
                                    <p className="element-caption">Password:</p>
                                    <input className="form-input" ref="password" type="password" name="password" defaultValue="pass01" placeholder="Enter your password" />
                                </li>
                                <li>
                                    <button className="form-submit-button" type="submit">Login</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;