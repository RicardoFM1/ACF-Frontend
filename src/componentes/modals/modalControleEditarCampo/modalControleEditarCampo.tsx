import { Controller, useForm } from "react-hook-form"
import type { modalProps } from "../modalsInterface/modalInterface"
import style from "./modalControleEditarCampo.module.css"
import {atualizarNomePrecoSchema, type iAtualizarNomePrecoCampos } from "../../../schemas/campo.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { apiController } from "../../../controller/api.controller"
import { toastbar } from "../../utility/tokenUtility"
import CurrencyInput from "react-currency-input-field"
import { ModalEditarHorarios } from "../modalControleEditarHorarios/modalControleEditarHorarios"
import { useState } from "react"


export const OpenModalEditarCampo = ({campoId, isOpen, onClose}:modalProps) => {
  const [showEditarHorarios,setShowEditarHorarios]= useState(false)
    const {
        control,
        register,
        handleSubmit,
        formState: {errors}
    }=useForm<iAtualizarNomePrecoCampos>({
        mode: "onBlur",
        resolver: zodResolver(atualizarNomePrecoSchema),
        defaultValues: {
        valor: 0
    },
    })
    const openEditarHorarios=()=>{
      setShowEditarHorarios(true)
    }
    const atualizarNomePrecoCampo = async(campoData:iAtualizarNomePrecoCampos) => {
        try{
            const campoAtualizar = await apiController.patch(`/campos/${campoId}`, campoData)  
            if(campoAtualizar){
                toastbar.success("Campo atualizado com sucesso!")
            }
        }catch(error:any){
            console.log(error.response.data.message)
            toastbar.error("Erro ao atualizar o campo!")
        }

    }

    if(isOpen){
      return <div className={style.fundoModal}>
      <div className={style.editarCampos}>
                    <header className={style.headerEditarCampos}>
                      <div>
                      Editar campos
                      </div>
                      <div>
                      <button type="button" onClick={onClose} className={style.btnFecharModal}>X</button>
                      </div>
                    </header>
                    <form onSubmit={handleSubmit(atualizarNomePrecoCampo)} className={style.formEditarCampo}>
                    <div className={style.divPrincipal}>
                        <div className={style.ladoEsquerdoEditarCampo}>
                        <div className={style.preco}>
                    <h3 className={style.h3EditarCampos }>Preço:</h3>
                    
                    <Controller
  name="valor"
  control={control}
  rules={{ required: "valor obrigatório" }}
  render={({ field }) => (
    <CurrencyInput
      placeholder="ex: 120,90"
      decimalsLimit={2}
      decimalSeparator=","
      groupSeparator="." 
      prefix="R$ "
      className={style.inputPreco}
      defaultValue={(field.value ?? 0) / 100} 
      onValueChange={(value) => {
        const numericValue = value
          ? Math.round(parseFloat(value.replace(',', '.')) * 100)
          : 0;
        field.onChange(numericValue); 
      }}
    />
  )}
/>
                    <span className={style.errorMsg}>
                {errors.valor?.message}
              </span>
                        </div>
                       <div className={style.nomeCampoEditar}>
                            <h3 className={style.h3EditarCampos }>Nome:</h3>
                         <input {...register("nome")} type="text" className={style.inputNome}/>
                        </div>
                        <span className={style.errorMsg}>{errors.nome?.message}</span>
                        </div>  
                        <div className={style.ladoDireitoEditarCampo}>
                        <div className={style.horario}>
                              <h3 className={style.h3EditarCampos }>Horários:</h3>
                              <button type="button" onClick={openEditarHorarios} 
                                className={style.modificarHorarios}>
                                  Modificar horários</button>
                        </div>
                         <div className={style.divBtnSalvar}>
                            <button className={style.btnSalvar} type="submit">Salvar</button>
                         </div>
                         </div>
                    </div> 
                    
                </form>
                </div>
                <ModalEditarHorarios onClose={()=>setShowEditarHorarios(false)} isOpen={showEditarHorarios}/>
      </div>
    
    }else{
        return <></>
    }
  }


    