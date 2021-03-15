import React from 'react';
import s from './error.module.scss';

export default function Error(props) {
  return (
    <div className={s.error}>
      <p className={s.text}>{props.text}</p>
    </div>
  );
}