import React from 'react';
import s from './editor__select-groud.module.scss';

export default class EditorSelect extends React.Component {
  constructor(props) {
    super(props);
  }
  getOption(value, text) {
    return <option key={value} value={value}>{text}</option>;
  }
  getOptions(arg) {
    let options = [];
    for (let i = 1; i <= 104; i++) {
      options.push(this.getOption(i, `Номер участка: ${i}`));
    }
    return options;
  }
  render() {
    return (
      <select className={s['slect-grounds']} name="grounds">
        {this.getOptions(this.props.grounds)}
      </select>
    );
  }
}
