import React from 'react';
import s from './form-status.module.scss';

export default function CustomError(props) {
  return (
    <div className={s['form-status']}>
      <p className={s.text}>{props.text}</p>
    </div>
  );
}