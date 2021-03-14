import React from 'react';
import s from './editor__ground-status.module.scss';

export default function EditorGroundStatus() {
  return (
    <select className={s['editor__ground-status']}>
      <option value="default">Статус не выбран</option>
      <option value="free">Свободно</option>
      <option value="booked">Забронировано</option>
      <option value="with-home">С домом</option>
      <option value="sold">Продано</option>
    </select>
  );
}