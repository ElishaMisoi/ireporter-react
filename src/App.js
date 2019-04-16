import React, { Component } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <div>
      <ToastContainer />
      <BrowserRouter>      
        <div className="App">
          <Router history={history} >
            <Routes />
          </Router>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;