import React from 'react';
import s from './custom-button.module.scss';

export default function(props) {
  return (
    <button 
      className={s['custom-button']}
      type={props.type}
    >
      {props.text}
    </button>
  );
}