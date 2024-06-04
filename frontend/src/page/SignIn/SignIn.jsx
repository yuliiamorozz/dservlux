import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from './SignInStyle.module.css'
import axios from "axios";

export const DISPATCHER = [] 

export default function SignIn() {
  const [login, setLogin] = useState()
  const [password, setPassword] = useState()
  const [dispatchers, setDispatchers] = useState()
  const [dispatcher, setDispatcher] = useState()
  const [flag, setFlag] = useState(false)
  const loginRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  const baseURL = "http://localhost:8800";

  useEffect(() => {
    const fetchAllDispatchers = async () => {
      try {
        const res = await axios.get(baseURL + "/dispatchers");
        setDispatchers(res.data);
        console.log(res.data)
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchAllDispatchers();

    const fetchDispatcher = async () => {
      try {
        const res = await axios.get(baseURL + "/dp/" + "gumdar@gmail.com");
        setDispatcher(res.data);
        DISPATCHER = res.data
      } catch (e) {
        console.log("err from axios = " + e);
      }
    };
    fetchDispatcher();

  },[])

  const onClickLogIn = () => {
    // console.log(" login = " + login + " password = " + password)
    if(login && password ){
      try {
        axios.get(baseURL + "/dp/" + login + "/" + password).then((res) => {
          const users = res.data;
          if(users.length > 0){
            navigate("/home/" + login)
          }else if(users.length == 0){
            alert("Не має жодного користувача з таким логіном та паролем")
          } 
         
        });
      } catch (error) {
        console.log(error);
      }
    }else{
      alert("Будь ласка введіть усі дані")
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

  return (
    <div className={s.main_container}>
      <div className={s.main_container__for_form}>
        <div className={s.main_container__for_form__title_form}>Авторизація</div>

        <div className={s.form_cls}>
            <input type="text"className={s.input_default} ref={loginRef} id="" placeholder="введіть свій логін" onChange={onChangeLogin}/>
            <input type="password"className={s.input_default} ref={passwordRef} id="" placeholder="введіть свій пароль" onChange={onChangePassword}/>
            <div className={s.button_default} id="btn_login" onClick={onClickLogIn}>Вхід</div>
        </div>
        <div className={s.non_account}>Не маєте акаунту? <Link to="/signup" >Зареєструватись</Link></div>
      </div>
     
    </div>
  );
}
