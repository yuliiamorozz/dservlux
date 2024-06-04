import React from 'react'
import s from './VCIStyle.module.css'
import APhoneLink from '../../General/APhoneLink/APhoneLink'

export default function ViewClientItem({name,atext, address, time, onClick, bgCor}) {

  return (
    <div className={s.clients_container__item}  style={bgCor == 1 ? {backgroundColor: "#fff01e"} : {backgroundColor: "#d8d8d8"}} onClick={onClick}>
          <div className={s.clients_container__item__name}>{name}</div>
          <div className={s.clients_container__item__phone}>
            <APhoneLink atext={atext} />
          </div>
          <div className={s.clients_container__item__addres}>
            {address}
          </div>
          <div className={s.clients_container__item__time}>{time}</div>
        </div>
  )
}
