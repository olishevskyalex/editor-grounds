import React from 'react';
import s from './editor.module.scss';

import SelectGrounds from './_select-grouds.jsx';
import GroundStatus from './_ground-status.jsx';
import CustomInput from './../custom-input/custom-input.jsx';
import CustomButton from './../custom-button/custom-button.jsx';
import { Redirect } from 'react-router';

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
    this.formHandler = this.formHandler.bind(this);
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
  getInputsActive() {
    let result = {
      number: false,
      size: false,
      price: false,
    };
    if (this.state.number !== '') {
      result.number = true;
    }
    if (this.state.size !== '') {
      result.size = true;
    }
    if (this.state.price !== '') {
      result.price = true;
    }
    return result;
  }
  async formHandler(e) {
    try {
      e.preventDefault();
      const body = {
        key: e.target[0].value,
        number: e.target[1].value,
        size: e.target[2].value,
        price: e.target[3].value,
        status: e.target[4].value,
      };
      console.log(body);
      let response = await fetch('/api/map-config', {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      let answer = await response.json();
      console.log(answer);
    } catch(e) {
      console.log(e);
    }
  }
  render() {
    const inputsActive = this.getInputsActive();
    if (!this.props.isAuth) {
      return <Redirect to="/auth" />;
    }
    return (
      <form 
        className={s.editor}
        onSubmit={this.formHandler}
      >
        <h3 className={s.title}>Изменение информации</h3>
        <SelectGrounds
          className={s.select}
          grounds={this.props.grounds}
          onChange={this.changeVeiwData}
        />
        <CustomInput
          className={s['custom-input']}
          name="number"
          placeholder="Номер участка"
          value={this.state.number}
          onChange={this.controlChange}
          isActive={inputsActive.number}
        />
        <CustomInput
          className={s['custom-input']}
          name="size" 
          placeholder="Размер" 
          value={this.state.size}
          onChange={this.controlChange}
          isActive={inputsActive.size}
        />
        <CustomInput
          className={s['custom-input']}
          name="price"
          placeholder="Цена"
          value={this.state.price}
          onChange={this.controlChange}
          isActive={inputsActive.price}
        />
        <GroundStatus
          className={s.select}
          value={this.state.status}
          onChange={this.controlChange}
        />
        <CustomButton text="Сохранить" />
      </form>
    );
  }
}