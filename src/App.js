import React, { Component } from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes';


const history = createBrowserHistory();
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Router history={history} >
            <Routes />
          </Router>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;