import React from 'react';
import s from './custom-error.module.scss';

export default function CustomError(props) {
  let selectors = s['custom-error'];
  if(props.isActive) {
    selectors += ' ' + s['custom-error_active'];
  }
  return (
    <div className={selectors}>
      <p className={s.text}>{props.text}</p>
    </div>
  );
}