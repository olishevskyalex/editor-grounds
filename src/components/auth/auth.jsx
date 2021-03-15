import React from 'react';
import s from './auth.module.scss';

import CustomInput from './../custom-input/custom-input.jsx';
import CustomButton from './../custom-button/custom-button.jsx';
import Error from './../error/error.jsx';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: false,
    }
  }
  getError() {
    if (!this.state.isError) {
      return;
    }
    return (
      <Error text='Неправильный логин или пароль.' />
    );
  }
  render() {
    return (
      <div className={s.auth}>
        {this.getError()}
        <form 
        action="/log-in" 
        className={s.form} 
        method="post"
      >
        <span className={s.title}>Авторизация</span>
        <CustomInput
          type="text"
          name="login"
          placeholder="Логин"
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Пароль"
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