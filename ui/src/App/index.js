import React, { Component } from 'react';
import './App.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div>
        <nav className="pt-navbar">
          <div className="pt-navbar-group pt-align-left">
            <div>
              <div className="pt-navbar-heading">Network Dashboard</div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default App;
