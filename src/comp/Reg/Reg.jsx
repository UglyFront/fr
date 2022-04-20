import Animate from "../Animate";
import {Link} from "react-router-dom"
import { createRef } from "react";
import {ADRESS} from "../../redux/const"

function Reg() {



  let inpName = createRef()
  let inpLogin = createRef()
  let inpPass = createRef()







  function registration () {
    if ((inpName.current.value && inpLogin.current.value && inpPass.current.value).length === 0) {
      alert("Заполните все поля!")
    }
    else if (inpLogin.current.value.length < 3) {
      alert("Логин больше 3 символов")
    }
    else {
      let body = {
        name: inpName.current.value,
        login: inpLogin.current.value,
        password: inpPass.current.value
    }

  
    fetch(`http://${ADRESS}:4444/reg`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
          "Content-Type": "application/json"
      }
  })
  .then(response => response.json())
  .then(data => alert(data))
    }
  }









    return (
      <div className="reg">
          <h1>Регистрация</h1>
          <form action="">
          <div>
              <span>Ваше имя:</span>
              <input ref = {inpName} type="text" placeholder="@durov_loh"/>
          </div>

          <div>
              <span>Имя пользователя:</span>
              <input ref = {inpLogin} type="text" placeholder="@durov_loh"/>
          </div>

          <div>
              <span>Пароль:</span>
              <input ref = {inpPass} type="password" placeholder="Ваш пароль"/>
          </div>
    </form>
          <Link to = "/auth"><span id = "regspan">Авторизоваться</span></Link>
          <Animate width = "100%" height = "200px"/>
          <div className="authBtn" onClick={() => {registration()}}>Зарегистироваться</div>
      </div>
    );
  }
  
  export default Reg;
  