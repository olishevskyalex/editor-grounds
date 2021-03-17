import React from 'react';
import ReactDOM from 'react-dom';
import regeneratorRuntime from 'regenerator-runtime';
import {BrowserRouter, Route, Redirect} from 'react-router-dom';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './app.scss';

import Editor from './components/editor/editor.jsx';
import Auth from './components/auth/auth.jsx';
import ExitButton from './components/exit-button/exit-button.jsx';

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
  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
  getMainPage() {
    if (this.getCookie('connect.sid') !== undefined) {
      return <Redirect to="/editor" />;
    }
    return <Auth />;
  }
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Route path='/editor'>
            <Editor grounds={this.state.grounds} />
            <ExitButton />
          </Route>
          <Route exact path='/'>
            {this.getMainPage()}
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);