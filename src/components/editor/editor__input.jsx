import React from 'react';
import s from './editor__input.module.scss';

export default function EditorInput(props) {
  return (
    <input 
      name={props.name} 
      className={s.input} 
      type="text" 
      placeholder={props.placeholder} 
      value={props.value}
      onChange={props.onChange}
    />
  );
}