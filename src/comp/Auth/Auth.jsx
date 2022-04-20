import Animate from "../Animate";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { AT } from "../../redux/action";
import { createRef } from "react";

function Auth() {
  const dispatch = useDispatch()

  let user = useSelector(state => state.user)


  let login = createRef()
  let pass = createRef()

  async function auth() {
    let body = {
      login: login.current.value,
      password: pass.current.value
    }

    await dispatch(AT.login(body))
  
  }

    if (!user.id) {return (
      <div className="auth">
          <h1>Авторизация</h1>
          <form action="">
          <div>
              <span>Имя пользователя</span>
              <input ref = {login} type="text" placeholder="@durov_loh"/>
          </div>

          <div>
              <span>Пароль</span>
              <input ref = {pass} type="password" placeholder="Ваш пароль"/>
          </div>

          
    </form>
          <Link to = "/reg"><span id = "regspan">Зарегистироваться</span></Link>
          <Animate width = "100%" height = "230px"/>

          <div className="authBtn" onClick={() => {auth()}}>Войти</div>
      </div>
    )}
    else {
     return(
      <div className="auth">
      <h1>Войдено</h1>

      <Animate width = "100%" height = "420px"/>

      <Link to = "/chats"><div className="authBtn">К чатам</div></Link>
  </div>

     ) 
    };
  }
  
  export default Auth;
  