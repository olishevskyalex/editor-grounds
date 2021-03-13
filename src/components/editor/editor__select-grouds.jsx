import React from 'react';
import s from './editor__select-grouds.module.scss';

export default class EditorSelectGrounds extends React.Component {
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
    return (
      <select 
        className={s['slect-grounds']} 
        name="ground-id"
        onChange={this.props.onChange}
      >
        <option key="default" value="default">Выберите участок</option>
        {this.getOptions(this.props.grounds)}
      </select>
    );
  }
}
