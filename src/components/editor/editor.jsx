import React from 'react';
import s from './editor.module.scss';

import EditorSelectGrounds from './editor__select-grouds.jsx';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      number: '1',
      size: '1',
      price: '1',
    }
    this.changeVeiwData = this.changeVeiwData.bind(this);
  }
  changeVeiwData(e) {
    const groundID = e.target.value;
    const groundActive = this.props.grounds[groundID];
    this.state = {
      number: groundActive.number,
      size: groundActive.size,
      price: groundActive.price,
    }
    console.log(this.state);
  }
  render() {
    return (
      <form className={s.editor}>
        <h3 className={s.title}>Изменение информации</h3>
        <EditorSelectGrounds
          grounds={this.props.grounds}
          onChange={this.changeVeiwData}
        />
        <input 
          name="number" 
          className={s.input} 
          type="text" 
          placeholder="Номер участка"
          value={this.state.number}
        />
        <input 
          name="size" 
          className={s.input} 
          type="text" 
          placeholder="Размер" 
          value={this.state.size}
        />
        <input 
          name="price" 
          className={s.input} 
          type="text" 
          placeholder="Цена"
          value={this.state.price}
        />
        <button className={s.button} type="submit">Cохранить</button>
      </form>
    );
  }
}