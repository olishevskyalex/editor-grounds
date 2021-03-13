import React from 'react';
import s from './editor.module.scss';

import EditorSelectGrounds from './editor__select-grouds.jsx';
import EditorInput from './editor__input.jsx';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      number: '',
      size: '',
      price: '',
    }
    this.changeVeiwData = this.changeVeiwData.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }
  changeVeiwData(e) {
    const groundID = e.target.value;
    const groundActive = this.props.grounds[groundID];
    this.setState({
      number: groundActive.number,
      size: groundActive.size,
      price: groundActive.price,
    });
    console.log(this.state);
  }
  handleChangeInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value,
    });
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
        <EditorInput
          name="number"
          placeholder="Номер участка"
          value={this.state.number}
          onChange={this.handleChangeInput}
        />
        <EditorInput 
          name="size" 
          placeholder="Размер" 
          value={this.state.size}
          onChange={this.handleChangeInput}
        />
        <EditorInput 
          name="price"
          placeholder="Цена"
          value={this.state.price}
          onChange={this.handleChangeInput}
        />
        <button className={s.button} type="submit">Cохранить</button>
      </form>
    );
  }
}