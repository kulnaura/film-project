import React, { Component } from 'react';
import { Handlers } from './handlers';
import fetch from 'isomorphic-fetch';
import * as filmActions from './../actions/filmActions';
import RentedFilmListView from './../views/rentedFilmListView';

import './../styles/css/film.css';

class RentedFilmList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: null
        };
    }

    componentDidMount() {
        filmActions.getRentedFilmList()
            .then(json => {
                this.setState({
                    list: json.result,
                });
            });
    }

    render() {
        return (
            <RentedFilmListView list={this.state.list} urlParams={this.urlParams} />
        )
    }
}

export default RentedFilmList;