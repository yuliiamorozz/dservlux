import React from "react";
import s from './VPIStyle.module.css'

export default function ViewProfileItem({ title, value}) {
  return (
    <div className={s.profile_container__content__item}>
      <div className={s.profile_container__content__item__title}>{title}</div>
      <div className={s.profile_container__content__item__value}>{value}</div>
    </div>
  );
}
