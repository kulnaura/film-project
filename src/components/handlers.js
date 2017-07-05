import React, { Component } from 'react';

export class Handlers extends Component {
    static handleErrors(response) {
        if (!response.status) {
            if (response.error) {
                throw Error(response.error);
            } else if (response.message) {
                throw Error(response.message);
            } else {
                console.log(response);
            }
        }
        return response;
    }
}

export default Handlers;