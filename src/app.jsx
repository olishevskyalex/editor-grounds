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
    let isAuth = false;
    if (this.checkCookie()) {
      isAuth = true;
    }
    this.state = {
      grounds: null,
      isAuth: isAuth,
    }

    this.getMapConfig();
    this.changeAuthState = this.changeAuthState.bind(this);
    this.getMapConfig = this.getMapConfig.bind(this);
  }
  async getMapConfig() {
    try {
      let response = await fetch('/api/map-config');
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
  checkCookie() {
    if (this.getCookie('connect.sid')) {
      return true;
    }
    return false;
  }
  changeAuthState(arg) {
    if(typeof arg !== 'boolean') {
      return;
    }
    this.setState({
      isAuth: arg,
    });
  }
  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Route path='/editor'>
            <Editor 
              isAuth={this.state.isAuth}
              grounds={this.state.grounds}
              updateConfig={this.getMapConfig}
            />
            <ExitButton 
              changeAuthState={this.changeAuthState}
            />
          </Route>
          <Route exact path='/'>
            <Redirect to="/auth" />
          </Route>
          <Route path='/auth'>
            <Auth 
              isAuth={this.state.isAuth}
              changeAuthState={this.changeAuthState}
            />
          </Route>
        </BrowserRouter>
      </div>
    );
  }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);