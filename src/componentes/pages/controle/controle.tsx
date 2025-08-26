import { Link } from "react-router-dom"
import style from "./controle.module.css"
import { Iconify } from "../../iconify/iconify"

export const Controle = () => {
    return <>
    <header className={style.headerControle}>
        <Link to="/admin" className={style.Linkvoltar}>voltar</Link>
        <p>Controle</p>
        </header>
    <div className={style.divH1}>
            <h1>Controle seus campos de futebol</h1>
    </div>
            <div className={style.controleDosCampos}>
                <div className={style.campos}>
                <h3>O que deseja controlar?</h3>
                <div className={style.caixaCampo}>
                    <div className={style.campo}><div>
                        <p className={style.p}>Campo #1</p>
                        </div>                        
                        <div className={style.ola}>
                            <p className={style.p}>R$ 189,90</p>
                            <button className={style.maisInformacoes}>Mais informações</button>
                        </div>
                    </div>
                    <div className={style.icons}>
                              <Iconify icon="fe:trash"/>
                      <Iconify icon="raphael:pensil"/>
                    </div>
                </div>
                  <div className={style.caixaCampo}>
                    <div className={style.campo}><div>
                        <p className={style.p}>Campo #2</p>
                        </div>                        
                        <div className={style.ola}>
                            <p className={style.p}>R$ 189,90</p>
                            <button className={style.maisInformacoes}>Mais informações</button>
                        </div>
                    </div>
                    <div className={style.icons}>
                              <Iconify icon="fe:trash"/>
                      <Iconify icon="raphael:pensil"/>
                    </div>
                </div>
                  <div className={style.caixaCampo}>
                    <div className={style.campo}><div>
                        <p className={style.p}>Campo #3</p>
                        </div>                        
                        <div className={style.ola}>
                            <p className={style.p}>R$ 189,90</p>
                            <button className={style.maisInformacoes}>Mais informações</button>
                        </div>
                    </div>
                    <div className={style.icons}>
                              <Iconify icon="fe:trash"/>
                      <Iconify icon="raphael:pensil"/>
                    </div>
                </div>
                
               
                </div>
                <button className={style.adicionar}>  <Iconify icon="ic:sharp-add"/>adicionar</button>
                </div>    
                <div className={style.divSecundaria}>
                    <h3>Horários disponiveis na semana:</h3>
                    <button className={style.visualizar}>Vizualizar</button>
                </div>
                <div className={style.editarCampos}>
                    <header className={style.headerEditarCampos}>Editar campos</header>
                    <div className={style.divPrincipal}>
                        <div className={style.preco}>
                    <h3 className={style.h3EditarCampos }>Preço:</h3>
                    <input type="number" placeholder="R$" className={style.inputPreco}/>
                    
                        </div>
                        <div className={style.horario}>
                              <h3 className={style.h3EditarCampos }>Horários:</h3>
                              <button className={style.modificarHorarios}>Modificar horários</button>
                        </div>
                    </div> 
                </div>
                    <div className={style.horarios}>
                         <header className={style.headerEditarCampos}>Horarios</header>
                         <div className={style.divDias}>
                            <div className={style.horariosInputs}>
                                <h3 className={style.h3Horarios}>Segunda-feira</h3>
                                <div className={style.inputsHorarios}>
                                    <div className={style.inputHorario}>
                                           <label>Horário inicial</label>
                                    <select name="" id="" className={style.selectHorario}><option value="" >00:00</option></select>
                                    </div>
                                   <div className={style.inputHorario}>
                                           <label>Horário final</label>
                                    <select name="" id="" className={style.selectHorario}><option value="">00:00</option></select>
                                    </div>
                                </div>
                            </div>
                         <div className={style.horariosInputs}>
                                <h3 className={style.h3Horarios}>Terça-feira</h3>
                                <div className={style.inputsHorarios}>
                                    <div className={style.inputHorario}>
                                           <label>Horário inicial</label>
                                    <select name="" id="" className={style.selectHorario}><option value="" >00:00</option></select>
                                    </div>
                                   <div className={style.inputHorario}>
                                           <label>Horário final</label>
                                    <select name="" id="" className={style.selectHorario}><option value="">00:00</option></select>
                                    </div>
                                </div>
                         </div>
                         <div className={style.horariosInputs}>
                                <h3 className={style.h3Horarios}>Quarta-feira</h3>
                                <div className={style.inputsHorarios}>
                                    <div className={style.inputHorario}>
                                           <label>Horário inicial</label>
                                    <select name="" id="" className={style.selectHorario}><option value="" >00:00</option></select>
                                    </div>
                                   <div className={style.inputHorario}>
                                           <label>Horário final</label>
                                    <select name="" id="" className={style.selectHorario}><option value="">00:00</option></select>
                                    </div>
                                </div>
                         </div>
                         <div className={style.horariosInputs}>
                                <h3 className={style.h3Horarios}>Quinta-feira</h3>
                                <div className={style.inputsHorarios}>
                                    <div className={style.inputHorario}>
                                           <label>Horário inicial</label>
                                    <select name="" id="" className={style.selectHorario}><option value="" >00:00</option></select>
                                    </div>
                                   <div className={style.inputHorario}>
                                           <label>Horário final</label>
                                    <select name="" id="" className={style.selectHorario}><option value="">00:00</option></select>
                                    </div>
                                </div>
                         </div>
                         <div className={style.horariosInputs}>
                                <h3 className={style.h3Horarios}>Sexta-feira</h3>
                                <div className={style.inputsHorarios}>
                                    <div className={style.inputHorario}>
                                           <label>Horário inicial</label>
                                    <select name="" id="" className={style.selectHorario}><option value="" >00:00</option></select>
                                    </div>
                                   <div className={style.inputHorario}>
                                           <label>Horário final</label>
                                    <select name="" id="" className={style.selectHorario}><option value="">00:00</option></select>
                                    </div>
                                </div>
                         </div>
                         <div className={style.horariosInputs}>
                                <h3 className={style.h3Horarios}>Sabado</h3>
                                <div className={style.inputsHorarios}>
                                    <div className={style.inputHorario}>
                                           <label>Horário inicial</label>
                                    <select name="" id="" className={style.selectHorario}><option value="" >00:00</option></select>
                                    </div>
                                   <div className={style.inputHorario}>
                                           <label>Horário final</label>
                                    <select name="" id="" className={style.selectHorario}><option value="">00:00</option></select>
                                    </div>
                                </div>
                         </div>
                         <div className={style.horariosInputs}>
                                <h3 className={style.h3Horarios}>Domingo</h3>
                                <div className={style.inputsHorarios}>
                                    <div className={style.inputHorario}>
                                           <label>Horário inicial</label>
                                    <select name="" id="" className={style.selectHorario}><option value="" >00:00</option></select>
                                    </div>
                                   <div className={style.inputHorario}>
                                           <label>Horário final</label>
                                    <select name="" id="" className={style.selectHorario}><option value="">00:00</option></select>
                                    </div>
                                </div>
                         </div>
                         </div>
                      
                    </div>
                <div className={style.footer}>
                                 <footer className={style.footerHome}>
                <div className={style.footerDiv1}>
                    <h2>ACF</h2>
                </div>
                <div className={style.footerDiv2}>
                    <div className={style.footerDiv3}>
                        <h4>Paginas</h4>
                        <p>Home</p>
                        <p>Agenda</p>
                        <p>Cadastro</p>
                        <p>Login</p>
                    </div>
                    <h4>introdução</h4>
                    <h4>Amostra</h4>
                    <h4>Etapas</h4>
                </div>
            </footer>
                </div>
      
    </>
}