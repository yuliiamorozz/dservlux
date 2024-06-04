import React from "react";
import s from "./VITStyle.module.css";

export default function ViewItemTaxi({ title, desc, atext }) {
  return (
    <div className={s.container_for_item}>
      <div className={s.container_for_item__title}>{title}</div>
      {atext ? (
        <div className={s.container_for_item__view_elem}>
          <a href={"tel:" + atext} className={s.a_phone_link}>
            {atext}
          </a>
        </div>
      ) : (
        <div className={s.container_for_item__view_elem}>{desc}</div>
      )}
    </div>
  );
}
