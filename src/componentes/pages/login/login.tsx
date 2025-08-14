import { Link } from "react-router-dom"
import style from "./login.module.css"

export const Login=()=>{ 

  return  <>
   <header className={style.header}>
    <h1>ACF</h1>
    <div className={style.btnCadastro}>
       <Link to={"/cadastro"} className={style.link}>Cadastro</Link> 
        </div>
   </header>
   <div className={style.divFundo}>
    <div className={style.Login}>
        <h2>Login</h2>
        <div className={style.formulario}>
<div className={style.inputs}>
        <p>Email</p>
        <input type="text" placeholder="digite seu email..." />
        </div>
        <div className={style.inputs}>
        <p>Senha</p>
        <input type="text" placeholder="digite sua senha..." />
        </div>
        </div>
        
        <button className={style.butnLogin}>Fazer login</button>

    </div>
   </div>
    </>
}