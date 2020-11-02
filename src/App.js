import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css'

import Main from './components/MainComponent';

class App extends Component {
    constructor (props) {
		super(props);
    }

    render () {
        return (
            <Router>
                <div className="App">
                    <Main />
                </div>
            </Router>
        );
    }
}

export default App;