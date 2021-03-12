import React from 'react';
import ReactDOM from 'react-dom';
import './app.scss';

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  getOption(value, text) {
    return <option key={value} value={value}>{text}</option>;
  }
  render() {
    let options = [];
    for (let i = 1; i <= 104; i++) {
      options.push(this.getOption(i, `Номер участка: ${i}`));
    }
    return (
      <form className="editor">
        <select name="" id="">
          {options}
        </select>
      </form>
    );
  }
}

function App() {
  return (
    <div className="app">
      <Editor />
    </div>
  );
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);