import type { modalProps } from "../modalsInterface/modalInterface"
import style from "./modalControleEditarHorarios.module.css"


export const ModalEditarHorarios = ({isOpen, onClose}:modalProps) => {
    console.log(isOpen,"open?")
    if(isOpen){

        return <div className={style.fundoModal}>
    <div className={style.horarios}>
                        
                         <header className={style.headerEditarCampos}>Horarios
                            <div className={style.divBtnFecharModal}>
                                <button onClick={onClose} className={style.fecharModal}>X</button>
                            </div>
                         </header>
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
                
      
    </div>
    
}else{
    return <></>
}

}