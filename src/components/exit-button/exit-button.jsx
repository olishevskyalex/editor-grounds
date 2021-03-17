import React from 'react';
import {Redirect} from 'react-router-dom';
import s from './exit-button.module.scss';

import CustomButton from './../custom-button/custom-button.jsx';

export default class ExitButton extends React.Component {
  constructor(props) {
    super(props);
    this.sendForm = this.sendForm.bind(this);
  }
  async sendForm(e) {
    e.preventDefault();
    try {
      const request = await fetch('/api/exit', {
        method: 'POST',
      });
      const json = await request.json();
      if (json.isExit) {
        this.props.changeAuthState(false);
        this.deleteCookie('connect.sid');
      }
    } catch(e) {
      console.log(e);
    }
  }
  setCookie(name, value, options = {}) {
    options = {
      path: '/',
      ...options
    };
    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
    document.cookie = updatedCookie;
  }
  deleteCookie(name) {
    this.setCookie(name, "", {
      'max-age': -1
    }); 
  }
  render() {
    return (
      <div className={s['exit-button']}>
        <form 
          onSubmit={this.sendForm}
          className={s['form']} 
        >
          <CustomButton
          type="submit" 
          text="Выйти" 
          />
        </form>
      </div>
    );
  }
}