import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from './SignUpStyle.module.css'
import axios from "axios";

export default function SignUp() {
  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [department, setDepartment] = useState()
  const [dispatchers, setDispatchers] = useState()
  const [flag, setFlag] = useState(false)
  const loginRef = useRef()
  const passwordRef = useRef()
  const nameRef = useRef()
  const departmentRef = useRef()
  const navigate = useNavigate()

  const baseURL = "http://localhost:8800";

  const onClickRegist = () => {
    // console.log(" login = " + login + " password = " + password)
    if(login && password && name && department){
    const dispatcherObj = {
      "name": name,
      "department": department,
      "email": login, 
      "password": password
    }


    axios.post(baseURL + "/dispatcher", dispatcherObj).then(res => {
      console.log(res.data)
      navigate('/home/' + login)
    });
    
    }else{
      alert("Будь ласка введіть усі дані в полях!!!")
    }
   
    
     
    
  }

  const onChangeLogin = () => {
    if(loginRef.current){
       setLogin(loginRef.current.value)
    }
     
  }
  const onChangePassword = () => {
    if(passwordRef.current)
      setPassword(passwordRef.current.value)
  }

  const onChangeName = () => {
    if(nameRef.current)
      setName(nameRef.current.value)
  }

  const onChangeDepartment = () => {
    if(departmentRef.current)
      setDepartment(departmentRef.current.value)
  }



  return (
    <div className={s.main_container}>
      <div className={s.main_container__for_form}>
        <div className={s.main_container__for_form__title_form}>Реєстрація</div>

        <div className={s.form_cls}>
            <input type="text"className={s.input_default} ref={loginRef} id="" placeholder="введіть свій логін (пошта)"onChange={onChangeLogin}/>
            <input type="password"className={s.input_default} ref={passwordRef} id="" placeholder="введіть свій пароль" onChange={onChangePassword}/>
            <input type="text"className={s.input_default} ref={nameRef} id="" placeholder="введіть своє ім'я" onChange={onChangeName}/>
            <input type="text"className={s.input_default} ref={departmentRef} id="" placeholder="введіть свій відділ" onChange={onChangeDepartment}/>
            <div className={s.button_default} id="btn_login" onClick={onClickRegist}>Зареєструватись</div>
        </div>
        <div className={s.non_account}>Мєте акаунту? <Link to="/" >Авторизація</Link></div>
      </div>
    </div>
  );
}
