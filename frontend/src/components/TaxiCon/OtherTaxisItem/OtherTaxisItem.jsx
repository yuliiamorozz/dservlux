import React from "react";
import s from "./OTIStyle.module.css";
import APhoneLink from "../../General/APhoneLink/APhoneLink";

export default function OtherTaxisItem({ name, atext, address, delayTime }) {
  return (
    <div className={s.container_for_other_taxist__item}>
      <div className={s.container_for_other_taxist__item__name}>{name}</div>
      <div className={s.container_for_other_taxist__item__phone}>
        <APhoneLink atext={atext} />
      </div>
      <div className={s.container_for_other_taxist__item__adress}>{address}</div>
      {delayTime >= 2 ? delayTime >= 10 ? (
        <div className={`${s.container_for_other_taxist__item__busy} ${s.wrbusy2}`}>
          <span className={`${s.busy_level} ${s.busy2}`}>{delayTime}</span>{" "}
          <span>хв</span>
        </div>
      ) : (
        <div className={`${s.container_for_other_taxist__item__busy} ${s.wrbusy1}`}>
          <span className={`${s.busy_level} ${s.busy1}`}>{delayTime}</span>{" "}
          <span>хв</span>
        </div>
      ) : (
        <div className={`${s.container_for_other_taxist__item__busy} ${s.wrbusy0}`}>
          <span className={`${s.busy_level} ${s.busy0}`}>{delayTime}</span>{" "}
          <span>хв</span>
        </div>
      )}
    </div>
  );
}
