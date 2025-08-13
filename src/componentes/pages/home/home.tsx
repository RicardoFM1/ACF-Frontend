
import { Link } from "react-router-dom"
import style from "./home.module.css"

export const Home=()=>{ 

  return  <>
        <header className={style.header}>
 <h1>ACF</h1>
 <div className={style.btns}> 
    <Link to={"/agendar"} className={style.linkCadastro}>agendar</Link>
    <Link to={"/cadastro"} className={style.linkCadastro}>Cadastro</Link> 
    <Link to={"/login"} className={style.linkLogin}>Login</Link>
 </div>

        </header>
    </>
}