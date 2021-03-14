import React from 'react';
import s from './auth__input.module.scss';

export default class AuthInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    }
    this.controlInput = this.controlInput.bind(this);
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
    return (
      <input 
        className={selectors} 
        type={this.props.type}
        name={this.props.name}
        onChange={this.controlInput}
      />
    );
  }
  render() {
    return (
      <div className={s.auth__input}>
        <label className={s.label}>
          {this.getPlaceholder()}
          {this.getInput()}
        </label>
      </div>
    );
  }
}