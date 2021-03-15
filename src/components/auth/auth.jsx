import React from 'react';
import s from './auth.module.scss';

import CustomInput from './../custom-input/custom-input.jsx';
import CustomButton from './../custom-button/custom-button.jsx';
import CustomError from './../custom-error/custom-error.jsx';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueLogin: '',
      valuePassword: '',
      error: null,
    }
    this.sendFrom = this.sendFrom.bind(this);
    this.controlInput = this.controlInput.bind(this);
  }
  getError() {
    if (this.state.error === null) {
      return;
    }
    return (
      <CustomError text={this.state.error} />
    );
  }
  controlInput(e) {
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'login') {
      this.setState({
        valueLogin: value,
      });
      return;
    }
    if (name === 'password') {
      this.setState({
        valuePassword: value,
      });
    }
  }
  async sendFrom(e) {
    try {
      e.preventDefault();
      const authData = {
        login: this.state.valueLogin,
        password: this.state.valuePassword,
      };
      let response = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      });
      let json = await response.json();
      if (!json.isAuth) {
        throw new Error('Неправильный логин или пароль.');
      }
      this.setState({
        error: null,
      });
    } catch(e) {
      this.setState({
        error: e.message,
      });
    }
    this.setState({
      valueLogin: '',
      valuePassword: '',
    }); 
  }
  render() {
    return (
      <div className={s.auth}>
        {this.getError()}
        <form 
        action="/auth" 
        className={s.form} 
        method="post"
        onSubmit={this.sendFrom}
      >
        <span className={s.title}>Авторизация</span>
        <CustomInput
          type="text"
          name="login"
          placeholder="Логин"
          value={this.state.valueLogin}
          onChange={this.controlInput}
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Пароль"
          value={this.state.valuePassword}
          onChange={this.controlInput}
        />
        <CustomButton 
          type="submit"
          text="Войти"
        />
      </form>
      </div>
    );
  }
}