import React, { Component } from 'react';
import { Handlers } from './handlers';
import fetch from 'isomorphic-fetch';
import * as sessionActions from './../actions/sessionActions';
import './../styles/css/addFilm.css';

class AddFilm extends Component {
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
        if (formData.name == "") {
            this.setStatus("Add film name");
            document.getElementById("name").focus();
            return false;
        }
        if (formData.year == "" || !formData.year.match(/\d/g)) {
            this.setStatus("Add rigth year");
            document.getElementById("year").focus();
            return false;
        }
        if (formData.genres == "") {
            this.setStatus("Add genres 1, 2 or/and 3");
            document.getElementById("genres").focus();
            return false;
        }
        formData.year = parseInt(formData.year);

        let genres = formData.genres;
        genres = genres.replace(/[\s\.\;\,]+/g, ",");
        genres = genres.split(",");

        function uniqIntArray(array) {
            var result = [];
            array.forEach(function(item) {
                if(result.indexOf(item) < 0) {
                    result.push(parseInt(item));
                }
            });
            return result;
        }

        genres = uniqIntArray(genres);
        formData.genres = genres;

        let data = {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify(formData),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionActions.getToken(),
            }
        };


        return fetch(`http://localhost:8001/api/v1/film`, data)
            .catch( err => {
                throw Error(err);
            })
            .then(response => Handlers.handleErrors(response.json()))
            .then(json => {
                if (json.success) {
                    for (const field in this.refs) {
                        this.refs[field].value = "";
                    }
                    this.setStatus("Film was added successfully");
                }
            })
    }

    render() {
        return (
            <div className="add-film-container">
                <div className="page-header">
                    <div className="page-caption">
                        <p>Add film page</p>
                    </div>
                </div>
                <div className="add-film-form-container">
                    <div className="form-caption">
                        <p>Add new film</p>
                    </div>
                    <div className="add-film-form">
                        <form onSubmit={this.onSubmit}>
                            <ul className="base-list add-film-form-list">
                                <li>
                                    <p className="element-caption">Film name:</p>
                                    <input className="form-input" ref="name" type="text" name="name" id="name" placeholder="Enter film name" />
                                </li>
                                <li>
                                    <p className="element-caption">Film year:</p>
                                    <input className="form-input" ref="year" type="number" name="year" id="year" placeholder="Enter film year" />
                                </li>
                                <li>
                                    <p className="element-caption">Film genres ids:</p>
                                    <p className="element-advice">(Genders contains numbers from 1 to 3, like: 1, 2)</p>
                                    <input className="form-input" ref="genres" type="text" name="genres" id="genres" pattern="[0-9\s\\,\\.\\;]+"  placeholder="Enter film genres ids" />
                                </li>
                                <li>
                                    <button className="form-submit-button" type="submit">Add film</button>
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

export default AddFilm;