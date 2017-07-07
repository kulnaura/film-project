import React, { Component } from 'react';
import * as authActions from './../actions/authActions';
import './../styles/css/registration.css';

class Registration extends Component {
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
        formData.age = parseInt(formData.age);

        authActions.register(formData, this);
    }

    render() {
        return (
            <div className="register-container">
                <div className="page-header">
                    <div className="page-caption">
                        <p>Registration page</p>
                    </div>
                </div>
                <div className="register-form-container">
                    <div className="form-caption">
                        <p>Registration form</p>
                    </div>
                    <div className="register-form">
                        <form onSubmit={this.onSubmit}>
                            <ul className="base-list register-form-list">
                            <li>
                                <p className="element-caption">Login:</p>
                                <input className="form-input" ref="login" type="text" name="login" placeholder="Enter login" />
                            </li>
                            <li>
                                <p className="element-caption">Password:</p>
                                <input className="form-input" ref="password" type="password" name="password" placeholder="Enter password" min="4"/>
                            </li>
                            <li>
                                <p className="element-caption">Username:</p>
                                <input className="form-input" ref="username" type="text" name="username" placeholder="Enter your username"/>
                            </li>
                            <li>
                                <p className="element-caption">Age:</p>
                                <input className="form-input" ref="age" type="number" name="age" placeholder="Enter your age"/>
                            </li>
                            <li>
                                <p className="element-caption">Phone:</p>
                                <input className="form-input" ref="telephone" type="tel" name="telephone" pattern="[0-9\s\+\-\(\)]{5,20}" placeholder="Enter your phone number"/>
                            </li>
                            <li>
                                <button className="form-submit-button" type="submit">Submit</button>
                            </li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Registration;