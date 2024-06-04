import React, { createElement, useEffect, useRef, useState } from "react";
import ViewProfileItem from "../../../../components/ProfileCon/ViewProfileItem/ViewProfileItem";
import s from './stylePrfD.module.css'

export default function FunPrfD(dispatcher) {
  const [funProfileDispr, setFunProfileDispr] = useState(() => (
    <div className={s.wr_items_profile}>
      {dispatcher.map((el) => (
        <div className={s.wr_itms_prf}>
          <ViewProfileItem
            title={"Ім'я:"}
            value={el.name ? el.name : "Дарина"}
          />
          <ViewProfileItem
            title={"Відділ:"}
            value={el.department ? el.department : "Диспечерська-1, Суми"}
          />
          <ViewProfileItem
            title={"Пошта:"}
            value={el.email ? el.email : "gumdar@gmail.com"}
          />
          <ViewProfileItem title={"Пароль:"} value={"*********"} />
    
        </div>
      ))}
    </div>
  ));
  return (<div>{funProfileDispr}</div>);
}
