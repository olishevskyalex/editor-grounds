import React from 'react';
import s from './_select-grouds.module.scss';

export default class SelectGrounds extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  getOption(value, text) {
    return <option key={value} value={value}>{text}</option>;
  }
  getOptions(arg) {
    let options = [];
    let grounds = this.props.grounds;
    for (let key in grounds) {
      options.push(this.getOption(key, `ID участка: ${key}`));
    }
    return options;
  }
  render() {
    let selectors = s['slect-grounds'];
    if (this.props.className !== undefined) {
      selectors += ' ' + this.props.className;
    }
    return (
      <select 
        className={selectors} 
        name="ground-id"
        onChange={this.props.onChange}
      >
        <option key="default" value="default">Выберите участок</option>
        {this.getOptions(this.props.grounds)}
      </select>
    );
  }
}
