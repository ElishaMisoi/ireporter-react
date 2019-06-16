import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NavBar from './components/NavBar.js'
require('./')

ReactDOM.render(<App />, document.getElementById('app'));

ReactDOM.render(<NavBar />, document.getElementById('navbar'));