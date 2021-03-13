import React from 'react';
import ReactDOM from 'react-dom';
import regeneratorRuntime from "regenerator-runtime";
import './app.scss';

import Editor from './components/editor/editor.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.getMapConfig();
  }
  async getMapConfig() {
    let response = await fetch('/api');
    console.log(response);
  }
  render() {
    return (
      <div className="app">
        <Editor />
      </div>
    );
  }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);