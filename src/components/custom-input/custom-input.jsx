import React from 'react';
import s from './custom-input.module.scss';

import PasswordButtons from './_password-buttons.jsx';

export default class AuthInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      type: this.props.type,
    }
    this.controlInput = this.controlInput.bind(this);
    this.controlPasswordButtons = this.controlPasswordButtons.bind(this);
  }
  controlInput(e) {
    const value = e.target.value;
    if (value.length > 0) {
      this.setState({
        isActive: true,
      });
      return;
    }
    this.setState({
      isActive: false,
    });
  }
  getPlaceholder() {
    let selectors = s.placeholder;
    if (this.state.isActive) {
      selectors += ' ' + s.placeholder_active;
    }
    return (
      <span className={selectors}>
        {this.props.placeholder}
      </span>
    );
  }
  getInput() {
    let selectors = s.input;
    if (this.state.isActive) {
      selectors += ' ' + s.input_active;
    }
    if (this.props.type === 'password') {
      selectors += ' ' + s.input_password;
    }
    return (
      <input 
        className={selectors} 
        type={this.state.type}
        name={this.props.name}
        onChange={this.controlInput}
      />
    );
  }
  controlPasswordButtons() {
    if (this.state.type === 'password') {
      this.setState({
        type: 'text'
      });
      return;
    }
    this.setState({
      type: 'password'
    });
  }
  render() {
    return (
      <div className={s['custom-input']}>
        <label className={s.label}>
          {this.getPlaceholder()}
          {this.getInput()}
        </label>
        {this.props.type === 'password' && <PasswordButtons onClick={this.controlPasswordButtons} />}
      </div>
    );
  }
}