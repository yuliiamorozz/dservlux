import React from "react";
import s from './APLStyle.module.css'

export default function APhoneLink({ atext }) {
  return (
    <a href={"tel:" + atext} className={s.a_phone_link}>
      {atext}
    </a>
  );
}
