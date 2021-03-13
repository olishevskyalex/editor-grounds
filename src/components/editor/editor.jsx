import React from 'react';
import s from './editor.module.scss';

import EditorSelect from './editor__select-groud.jsx';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form className={s.editor}>
        <h3 className={s.title}>Изменение информации</h3>
        <EditorSelect grounds='1' />
        <input className={s.input} type="text" placeholder="Размер" />
        <input className={s.input} type="text" placeholder="Цена" />
        <input className={s.input} type="text" placeholder="Статус" />
        <button className={s.button} type="submit">Cохранить</button>
      </form>
    );
  }
}