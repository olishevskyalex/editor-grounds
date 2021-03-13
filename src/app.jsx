import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss';

import Editor from './components/editor/editor.jsx';

function App() {
  return (
    <div className="app">
      <Editor />
    </div>
  );
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);