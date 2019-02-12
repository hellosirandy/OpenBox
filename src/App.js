import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route path="/(signin|signup|confirm)" component={AuthPage} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
