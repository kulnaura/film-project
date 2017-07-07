import React, { Component } from 'react';
import * as authActions from './../actions/authActions';
import './../styles/css/registration.css';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            status: false,
            statusMessage: "",
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

        const formData = {};
        for (const field in this.refs) {
          formData[field] = this.refs[field].value;
        }
        formData.age = parseInt(formData.age);

        if(formData.login.length < 3) {
            this.setStatus("Login should be longer then 3 symbols");
            document.getElementById("login").focus();
            return false;
        }

        if(formData.password.length < 4) {
            this.setStatus("Password should be longer then 4 symbols");
            document.getElementById("password").focus();
            return false;
        }

        if(formData.username == '') {
            this.setStatus("Empty username");
            document.getElementById("username").focus();
            return false;
        } else if(formData.username.length > 30) {
            this.setStatus("Invalid username: to long, more than 30 symbols");
            document.getElementById("username").focus();
            return false;
        }

        if(formData.age < 16 || formData.age > 120 || !formData.age) {
            this.setStatus("Incorrect user age");
            document.getElementById("age").focus();
            return false;
        }

        if(formData.telephone == "" || !formData.telephone.match(/[0-9\s\+\-\(\)]{5,20}/g)) {
            this.setStatus("Incorrect phone number");
            document.getElementById("telephone").focus();
            return false;
        }

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
                                <input className="form-input" ref="login" type="text" name="login" id="login" placeholder="Enter login" />
                            </li>
                            <li>
                                <p className="element-caption">Password:</p>
                                <input className="form-input" ref="password" type="password" name="password" id="password" placeholder="Enter password" min="4"/>
                            </li>
                            <li>
                                <p className="element-caption">Username:</p>
                                <input className="form-input" ref="username" type="text" name="username" id="username" placeholder="Enter your username"/>
                            </li>
                            <li>
                                <p className="element-caption">Age:</p>
                                <input className="form-input" ref="age" type="number" name="age" id="age" placeholder="Enter your age"/>
                            </li>
                            <li>
                                <p className="element-caption">Phone:</p>
                                <input className="form-input" ref="telephone" type="tel" name="telephone" id="telephone" pattern="[0-9\s\+\-\(\)]{5,20}" placeholder="Enter your phone number"/>
                            </li>
                            <li>
                                <button className="form-submit-button" type="submit">Submit</button>
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

export default Registration;