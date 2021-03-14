import React from 'react';
import s from './auth.module.scss';

import AuthInput from './auth__input.jsx';

export default class Auth extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form 
        action="/log-in" 
        className={s.auth} 
        method="post"
      >
        <AuthInput
          type="text"
          name="login"
          placeholder="Логин"
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="Пароль"
        />
      </form>
    );
  }
}