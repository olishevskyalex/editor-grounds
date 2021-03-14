import React from 'react';
import s from './_password-buttons.module.scss';


export default class PasswordButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
    }
  }
  getShowButton() {
    let selectors = s.button;
    if (!this.state.isShow) {
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
    if (this.state.isShow) {
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
        
      </div>
    );
  }
}