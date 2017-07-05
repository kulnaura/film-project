import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import './styles/css/App.css';
import './styles/css/base.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import Navbar from './components/navbar';
import Routes from './routes';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div className="App-main-container">
                        <header className="App-header">
                            <Navbar />
                        </header>
                        <div className="App-body">
                            <div className="main-container">
                                <Routes />
                            </div>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;