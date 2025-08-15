import { Link } from "react-router-dom"
import style from "./agendar.module.css"

export const Agendar=()=>{
    return <>
    <header className={style.headerAgendar}>
    <div className={style.divBtnVoltar}>
        <Link to={"/"} className={style.btnVoltar}>voltar</Link>
        </div>
            <h1 className={style.h1Agendar}>Agendamentos</h1>
    </header>
    <h2>Agende seu campo de futebol</h2>

    <div className={style.divEscolhaDoCampo}>
        <h3>escolha o campo disponivel</h3>
        <button className={style.btnEscolhaDoCampo}>Escolha um campo</button>
    </div>
    </>
}