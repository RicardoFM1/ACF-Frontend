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
        <div className={style.formulario}>
<div className={style.inputs}>
        <p>email</p>
        <input type="text" placeholder="digite seu email..." />
        </div>
        <div className={style.inputs}>
        <p>senha</p>
        <input type="text" placeholder="digite sua senha..." />
        </div>
        </div>
        
        <button className={style.butnLogin}>Fazer login</button>

    </div>
   </div>
    </>
}