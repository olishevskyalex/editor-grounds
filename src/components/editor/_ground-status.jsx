import React from 'react';
import s from './_ground-status.module.scss';

export default function GroundStatus(props) {
  let selectors = s['ground-status'];
  if (props.className !== undefined) {
    selectors += ' ' + props.className;
  }
  return (
    <select 
      name="status"
      className={selectors}
      value={props.value}
      onChange={props.onChange}
    >
      <option value="default">Статус не выбран</option>
      <option value="free">Свободно</option>
      <option value="booked">Забронировано</option>
      <option value="with-home">С домом</option>
      <option value="sold">Продано</option>
    </select>
  );
}