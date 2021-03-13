import React from 'react';
import s from './editor.module.scss';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  getOption(value, text) {
    return <option key={value} value={value}>{text}</option>;
  }
  render() {
    let options = [];
    for (let i = 1; i <= 104; i++) {
      options.push(this.getOption(i, `Номер участка: ${i}`));
    }
    return (
      <form className={s.editor}>
        <h3 className={s.title}>Изменение информации</h3>
        <select className={s.select} name="" id="">
          {options}
        </select>
        <input className={s.input} type="text" placeholder="Размер" />
        <input className={s.input} type="text" placeholder="Цена" />
        <input className={s.input} type="text" placeholder="Статус" />
        <button className={s.button} type="submit">Cохранить</button>
      </form>
    );
  }
}