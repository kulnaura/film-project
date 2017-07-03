import React, { Component } from 'react';
import * as sessionActions from './actions/sessionActions';

class Main extends Component {
  render() {
    return (
      <div className="main-page-container">
      	<div className="main-page-header">
        	Welcome, { sessionActions.checkAuth() ? sessionActions.getCurrentUserLogin() : "friend"}!
      	</div>
      	<div>
      	</div>
      </div>
    );
  }
}

export default Main;