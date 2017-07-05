import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import * as sessionActions from './../actions/sessionActions';
import './../styles/css/navbar.css';

const BaseNavbar = React.createClass({
    render() {
        return (
            <div className="navbar">
                <ul className="base-list navbar-list">
                    <li className="navbar-list-element"><Link to="/"><div className="navbar-list-innerblock">Home</div></Link></li>
                    <li className="navbar-list-element"><Link to="/films"><div className="navbar-list-innerblock">Films list</div></Link></li>
                    <li className="navbar-list-element"><Link to="/rented-films"><div className="navbar-list-innerblock">Rented Films list</div></Link></li>
                    <li className="navbar-list-element"><Link to="/add-film"><div className="navbar-list-innerblock">Add film</div></Link></li>
                    <li className="navbar-list-element"><Link to="/logout"><div className="navbar-list-innerblock">Logout ({sessionActions.getCurrentUserLogin()})</div></Link></li>
                </ul>
            </div>
        )
    }
})

const AuthNavbar = React.createClass({
    render() {
        return (
            <div className="navbar">
                <ul className="base-list navbar-list">
                    <li className="navbar-list-element"><Link to="/"><div className="navbar-list-innerblock">Home</div></Link></li>
                    <li className="navbar-list-element"><Link to="/login"><div className="navbar-list-innerblock">Sign in</div></Link></li>
                    <li className="navbar-list-element"><Link to="/registration"><div className="navbar-list-innerblock">Registration</div></Link></li>
                    <li className="navbar-list-element"><Link to="/films"><div className="navbar-list-innerblock">Films list</div></Link></li>
                </ul>
            </div>
        )
    }
})

class Navbar extends Component {
    render() {
        if (sessionActions.checkAuth() === true) {
            return (
                <BaseNavbar />
            )
        } else {
            return (
                <AuthNavbar />
            )
        }
    }
}
export default Navbar;