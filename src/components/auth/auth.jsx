import React from 'react';
import {Redirect} from 'react-router-dom';
import s from './auth.module.scss';

import CustomInput from './../custom-input/custom-input.jsx';
import CustomButton from './../custom-button/custom-button.jsx';
import FormStatus from './../form-status/form-status.jsx';

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
      <FormStatus text={this.state.error} />
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
    let isAuth = false;
    try {
      e.preventDefault();
      const authData = {
        login: this.state.valueLogin,
        password: this.state.valuePassword,
      };
      if (authData.login === '') {
        throw new Error('Введите логин');
      }
      if (authData.password === '') {
        throw new Error('Введите пароль');
      }
      let response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(authData),
      });
      let json = await response.json();
      this.setState({
        valueLogin: '',
        valuePassword: '',
      });
      if (!json.isAuth) {
        throw new Error('Неправильный логин или пароль.');
      }
      this.setState({
        error: null,
      });
      isAuth = true;
    } catch(e) {
      this.setState({
        error: e.message,
      });
    }
    if (isAuth) {
      this.props.changeAuthState(isAuth);
    }
  }
  getInputsActive() {
    let result = {
      login: false,
      password: false,
    };
    if (this.state.valueLogin !== '') {
      result.login = true;
    }
    if (this.state.valuePassword !== '') {
      result.password = true;
    }
    return result;
  }
  render() {
    const inputsActive = this.getInputsActive();
    if (this.props.isAuth) {
      return <Redirect to='/editor' />
    }
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
            className={s['custom-input']}
            type="text"
            name="login"
            placeholder="Логин"
            value={this.state.valueLogin}
            onChange={this.controlInput}
            isActive={inputsActive.login}
          />
          <CustomInput
            className={s['custom-input']}
            type="password"
            name="password"
            placeholder="Пароль"
            value={this.state.valuePassword}
            onChange={this.controlInput}
            isActive={inputsActive.password}
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