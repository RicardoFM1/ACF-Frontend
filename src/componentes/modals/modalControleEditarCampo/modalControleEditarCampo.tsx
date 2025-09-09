import { Controller, useForm } from "react-hook-form"
import type { iCampos, modalProps } from "../modalsInterface/modalInterface"
import style from "./modalControleEditarCampo.module.css"
import {atualizarNomePrecoSchema, type iAtualizarNomePrecoCampos } from "../../../schemas/campo.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { apiController } from "../../../controller/api.controller"
import CurrencyInput from "react-currency-input-field"
import { ModalEditarHorarios } from "../modalControleEditarHorarios/modalControleEditarHorarios"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"


export const OpenModalEditarCampo = ({campoId, isOpen, onClose}:modalProps) => {

  const [showEditarHorarios,setShowEditarHorarios]= useState(false)
  const [campo, setCampo] = useState({} as iCampos)

    const {
        control,
        register,
        handleSubmit,
        setValue,
        formState: {errors}
    }=useForm<iAtualizarNomePrecoCampos>({
        mode: "onBlur",
        resolver: zodResolver(atualizarNomePrecoSchema),
        defaultValues: {
        valor: 0,
        nome: campo.nome ? campo.nome : ""
    },
    })
    const openEditarHorarios=()=>{
      setShowEditarHorarios(true)      
    }

    const getCampo = async() => {
      const res = await apiController.get(`/campos/${campoId}`)
      if(res){
        setCampo(res)
      }
    }

    const colocarValores = () =>{
      setValue("nome", campo.nome)
      setValue("valor", campo.valor)
    } 

    const atualizarNomePrecoCampo = async(campoData:iAtualizarNomePrecoCampos) => {

  const nomePreenchido = campoData.nome.trim() !== "";
  const valorPreenchido = campoData.valor > 0;

        
          if(nomePreenchido && valorPreenchido){
            const campoAtualizar = await apiController.patch(`/campos/${campoId}`, campoData)  
            if(campoAtualizar){
                toast.success("Campo atualizado com sucesso!")
                onClose && onClose()
            }
          }else{
            onClose && onClose()
          }
           
      

    }

    useEffect(() => {
      if(campoId){
        getCampo() 
      }
    }, [campoId])

    useEffect(() => {
      colocarValores()
    }, [campo, setValue])
    

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
                          <div className={style.nomeCampoEditar}>
                            <h3 className={style.h3EditarCampos }>Nome:</h3>
                         <input {...register("nome")} type="text" className={style.inputNome}/>
                        </div>
                        <span className={style.errorMsg}>{errors.nome?.message}</span>
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
      value={field.value ? field.value / 100 : undefined}
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
                <ModalEditarHorarios campoId={campoId? campoId : null} onClose={()=>setShowEditarHorarios(false)} isOpen={showEditarHorarios}/>
      </div>
    
    }else{
        return <></>
    }
  }


    