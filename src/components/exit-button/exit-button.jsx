import React from 'react';
import s from './exit-button.module.scss';

import CustomButton from './../custom-button/custom-button.jsx';

export default class ExitButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form 
        className={s['exit-button']} 
        action="/auth"
      >
        <CustomButton
         type="submit" 
         text="Выйти" 
        />
      </form>
    );
  }
}