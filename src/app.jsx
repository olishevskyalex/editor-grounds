import React from 'react';
import ReactDOM from 'react-dom';
import regeneratorRuntime from "regenerator-runtime";
import './app.scss';

import Editor from './components/editor/editor.jsx';
import Auth from './components/auth/auth.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grounds: null
    }
    this.getMapConfig();
  }
  async getMapConfig() {
    try {
      let response = await fetch('/api');
      let json = await response.json();
      this.setState({
        grounds: json,
      });
    } catch(e) {
      console.log(e);
    }
  }
  render() {
    return (
      <div className="app">
        <Auth />
      </div>
    );
  }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);