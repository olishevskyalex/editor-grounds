import React from 'react';
import s from './_password-buttons.module.scss';


export default class PasswordButtons extends React.Component {
  constructor(props) {
    super(props);
  }
  getShowButton() {
    console.log(this.props);
    let selectors = s.button;
    if (this.props.inputType === 'password') {
      selectors += ' ' + s.button_active;
    }
    return (
      <button 
        className={selectors}
        type="button"
        onClick={this.props.onClick}
      >
        <i className={`${s.icon} far fa-eye`}></i>
      </button>
    );
  }
  getHideButton() {
    let selectors = s.button;
    if (this.props.inputType === 'text') {
      selectors += ' ' + s.button_active;
    }
    return (
      <button 
        className={selectors}
        type="button"
        onClick={this.props.onClick}
      >
        <i className={`${s.icon} far fa-eye-slash`}></i>
      </button>
    );
  }
  render() {
    return (
      <div className={s['password-buttons']}>
        {this.getShowButton()}
        {this.getHideButton()}
      </div>
    );
  }
}