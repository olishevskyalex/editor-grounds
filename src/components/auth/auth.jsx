import React from 'react';
import s from './auth.module.scss';

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
        <input type="text"/>
      </form>
    );
  }
}