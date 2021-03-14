import React from 'react';
import s from './auth.module.scss';

import CustomInput from './../custom-input/custom-input.jsx';

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
      </form>
    );
  }
}