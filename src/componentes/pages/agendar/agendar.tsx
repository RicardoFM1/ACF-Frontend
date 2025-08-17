import { Link } from "react-router-dom"
import style from "./agendar.module.css"

export const Agendar=()=>{
    return <>
    <header className={style.headerAgendar}>
    <div className={style.divBtnVoltar}>
        <Link to={"/"} className={style.btnVoltar}>Voltar</Link>
        </div>
            <h1 className={style.h1Agendar}>Agendamentos</h1>
    </header>
    <h2 className={style.h2Agendamento}>Agende seu campo de futebol</h2>

    <div className={style.divPrincipalAgendamento}>
        <div className={style.divOne}> 
        <div className={style.div1}>
      <h3>Escolha o campo disponivel</h3>
        <button className={style.btnEscolhaDoCampo}>Escolha um campo</button>
        </div>
        <div className={style.div2}>
            <h3>Escolha o horario disponivel</h3>
            <select className={style.selectInput} name="" id=""><option value="">Horario</option></select>
        </div>
        <div className={style.div3}>
            <h3>Ver meus Agendamentos</h3>
            <button className={style.btnVizualizar}>Visualizar</button>
        </div>
</div>
       
            <input type="date" className={style.inputAgendar}/>
    
    </div>
    </>
}