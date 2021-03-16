import React from 'react';
import s from './editor.module.scss';

import EditorSelectGrounds from './editor__select-grouds.jsx';
import EditorInput from './editor__input.jsx';
import EditorGroundStatus from './editor__ground-status.jsx';
import CustomInput from './../custom-input/custom-input.jsx';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      number: '',
      size: '',
      price: '',
      status: 'default',
    }
    this.changeVeiwData = this.changeVeiwData.bind(this);
    this.controlChange = this.controlChange.bind(this);
  }
  changeVeiwData(e) {
    if (e.target.value === 'default') {
      this.setState({
        number: '',
        size: '',
        price: '',
        status: 'default',
      });
      return
    }
    const groundID = e.target.value;
    const groundActive = this.props.grounds[groundID];
    this.setState({
      number: groundActive.number,
      size: groundActive.size,
      price: groundActive.price,
      status: groundActive.status,
    });
  }
  controlChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
      <form className={s.editor}>
        <h3 className={s.title}>Изменение информации</h3>
        <EditorSelectGrounds
          grounds={this.props.grounds}
          onChange={this.changeVeiwData}
        />
        <CustomInput
          name="number"
          placeholder="Номер участка"
          value={this.state.number}
          onChange={this.controlChange}
        />
        <CustomInput 
          name="size" 
          placeholder="Размер" 
          value={this.state.size}
          onChange={this.controlChange}
        />
        <CustomInput 
          name="price"
          placeholder="Цена"
          value={this.state.price}
          onChange={this.controlChange}
        />
        <EditorGroundStatus
          value={this.state.status}
          onChange={this.controlChange}
        />
        <button className={s.button} type="submit">Cохранить</button>
      </form>
    );
  }
}