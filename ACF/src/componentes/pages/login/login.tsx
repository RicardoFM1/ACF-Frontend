import style from "./login.module.css"

export const Login=()=>{
  return  <>
   <header className={style.header}>
    <h1>ACF</h1>
    <div className={style.btnCadastro}>Cadastro</div>
   </header>
   <div className={style.divFundo}>
    <div className={style.Login}>
        <h2>login</h2>
        <p>email</p>
        <input type="text" placeholder="digi"/>
    </div>
   </div>
    </>
}