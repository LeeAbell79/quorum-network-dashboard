import React, { Component } from 'react';

import Header from '../components/Header';
import {routes as scenes} from '../routes';

import './App.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main id="outer-container">
          {scenes}
        </main>
      </div>
    );
  }
}

export default App;
