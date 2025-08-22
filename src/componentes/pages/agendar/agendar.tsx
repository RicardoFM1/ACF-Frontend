import { Link, useNavigate } from "react-router-dom"
import style from "./agendar.module.css"
import { useEffect, useState } from "react"
import { apiController } from "../../../controller/api.controller"
import { Iconify } from "../../iconify/iconify"
import { useForm } from "react-hook-form"
import { createAgendamentoSchema, type iAgendamento, type iReturnAgendamento } from "../../../schemas/agendamento.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toastbar } from "../../utility/tokenUtility"



export const Agendar=()=>{
    const navigate = useNavigate()

    interface iCampos {
    id: number,
    nome: string,
    endereco: string,
    descricao: string,
    valor: number,
    imagem: string,
    }

    interface iUser {
        id: number,
        email: string,
        admin: boolean
    }

   interface iHorario {
    id: number,
    dia_da_semana: string,
    horario_inicial: string,
    horario_final: string,
    campos: {
        id: number,
        nome: string,
        endereco: string,
        descricao: string,
        valor: number,
        imagem: string,
    }
   }

   const [campos, setCampos] = useState([] as iCampos[])
   const [horarios, setHorarios] = useState([] as iHorario[])
   const [agendamentos, setAgendamentos] = useState([] as iReturnAgendamento[])
    const [modalCamposOpen, setModalCamposOpen] = useState(false)
    const [modalInfoOpen, setModalInfoOpen] = useState(false)
    const [campoId, setCampoId] = useState<number | null>(null)
    const [infoCampo, setInfoCampo] = useState<iCampos>({} as iCampos)
    const [modalAvisoOpen, setModalAvisoOpen] = useState(false)
    const [retrieve, setRetrieve] = useState<iUser|null>()
    const [modalVisualizarOpen, setmodalVisualizarOpen] = useState(false)

    const getRetrieve = async() => {
        const retrieve = await apiController.get("/usuarios/retrieve")
        setRetrieve(retrieve)
    } 

    const getCampos = async() => {
        const campos = await apiController.get("/campos")
        setCampos(campos)
    }

    const getAgendamentos = async() => {
        const retrieveId = retrieve?.id
        const agendamentos = await apiController.get(`/agendamentos/usuario/${retrieveId}`)
        setAgendamentos(agendamentos)
    }

    const fecharModalAviso = () => {
        setModalAvisoOpen(false)
        getCampos()
    }

    const fecharModalVisualizar = () => {
        setmodalVisualizarOpen(false)
    }

    const fecharModal = () => {
        setModalCamposOpen(false)
        getCampos()
    }
 
    const getCamposInfo = async() => {
        if(campoId){
            const campo = await apiController.get(`/campos/${campoId}`)
            
            if(campo){
                setInfoCampo(campo)
                console.log(campo)
            }
           
            
        }

    }
    const clickInformacoes = (id:number) => {
        setModalInfoOpen(true)
        setCampoId(id)
    }

    const clickSelecionar = (id:number) => {
        setModalCamposOpen(false)
        setCampoId(id)
    }
    useEffect(() => {
        console.log(campoId)
        getCamposInfo()
    }, [campoId])
    
    useEffect(() =>{
        getRetrieve()   
        getCampos()
        const interval = setInterval(() => {
            getCampos()
            getRetrieve()  
        }, 15000);
    const token = localStorage.getItem("token")
    if(!token){
        navigate("/login")
    }

    return () => clearInterval(interval)
    }, [])
    
     useEffect(() => {
        console.log(infoCampo)
    }, [infoCampo])

    useEffect(() => {
        if(retrieve?.id){
            getAgendamentos()
        }
    }, [retrieve])
    
    useEffect(() => {
       console.log(agendamentos)
    }, [agendamentos])

     const OpenModalCampos = () => {
        if(modalCamposOpen){
           

               
               return <>
            <div className={style.fundoModal}> 
                <div className={style.tituloModalCampos}>
                    <h2>Campos disponíveis</h2>
                    <div className={style.divBtnFecharModal}>
                    <button className={style.btnFecharModal} onClick={fecharModal}>X</button>
                    </div>
                </div>
                <div className={style.modal}>
                <div className={style.divPesquisa}>
                <input className={style.inputSearch} type="search" placeholder="Pesquise um campo" />
                <button className={style.btnPesquisar}>Pesquisar</button>
                </div>
                {campos.map((campo:iCampos) => (
                    
                    <div key={campo.id} className={style.fundoCampo}>
                    <div className={style.divCimaModal}>
                    <div className={style.divNomeCampo}>
                        <p><strong>{campo.nome}</strong></p>
                    </div>
                    <div className={style.divPrecoCampo}>
                        <p><strong>R${campo.valor}</strong> </p>
                    
                    </div>
                    </div>
                    <div className={style.divBtnsModalCampo}>
                        <button onClick={() => clickSelecionar(campo.id)}  className={style.selecionar}>Selecionar</button>
                        <button onClick={() => clickInformacoes(campo.id)}  className={style.maisInformacoes}>Mais informações</button>
                    </div>
                </div>
            ))}
                </div>

            </div>
            </>
        
    
    }else{
        return <></>
    }
    
}


const ModalAviso = () => {
        if(modalAvisoOpen){
    return <>
        <div className={style.fundoModal}>
            <div className={style.modalAviso}>
                <div className={style.divIconAlerta}>
                <Iconify icon="mingcute:alert-fill"
                color="#A02525"
                height={58}
                width={58}
                className={style.iconAlerta}
                />
                </div>
                <h2>AVISO!</h2>
                <p>Não há nenhum campo registrado ainda.</p>
                <div className={style.divBtnModal}>
                   
                    <button className={style.btnOk} onClick={fecharModalAviso}>Ok</button>
                   
                </div>
            </div>

        </div>
        </>
            
        }else{
            return <></>
        }
    }

    const OpenModalVisualizar = () => {
        if(modalVisualizarOpen){
    return <>
        <div className={style.fundoModal}> 
                <div className={style.tituloModalVisualizar}>
                    <h2>Meus agendamentos</h2>
                    <div className={style.divBtnFecharModal}>
                    <button className={style.btnFecharModal} onClick={fecharModalVisualizar}>X</button>
                    </div>
                </div>
                <div className={style.modal}>
                <div className={style.divPesquisa}>
                <input className={style.inputSearch} type="search" placeholder="Pesquise um agendamento" />
                <button className={style.btnPesquisar}>Pesquisar</button>
                </div>
                {agendamentos.map((agendamento:iReturnAgendamento) => (
                    
                    <div key={agendamento.campos.id} className={style.fundoAgendamento}>
                    <div className={style.divCimaModal}>
                    <div className={style.divNomeCampo}>
                        <p ><strong>{agendamento.campos.nome}</strong></p>
                    </div>
                    
                    <div className={style.divDateTimeAgendamento}>
                        
                    <div className={style.agendamentoData}>
                    <p><strong>{agendamento.data}</strong></p>
                    </div>
                    <div className={style.agendamentoHorario}>
                    <p><strong>{agendamento.horario ? agendamento.horario : "N/A"}</strong></p>
                    </div>
                    </div>
                    </div>
                    <div className={style.divBtnsModalCampo}>
                        <button onClick={() => clickInformacoes(agendamento.campos.id)}  className={style.maisInformacoes}>Mais informações</button>
                        <div className={style.divPrecoCampo}>
                        <p ><strong>R${agendamento.campos.valor}</strong></p>
                    </div>
                    </div>
                </div>
            ))}
                </div>

            </div>
            </>
        
    
    }else{
        return <></>
    }
    }

    const OpenModalInfo = () => {
        
       
        if(modalInfoOpen){
            return <>
            
             <div className={style.fundoModal}> 
            <div className={style.tituloModalInfoCampos}>
                    <h2>Informações do campo</h2>
                    <div className={style.divBtnFecharModal}>
                    <button className={style.btnFecharModal} onClick={() => setModalInfoOpen(false)}>X</button>
                    </div>
                </div>
                <div className={style.modalInfo}>
                    <div className={style.infoEsquerda}>
                    <div className={style.divEnderecoCampo}>
                    <h2>Endereço</h2>
                    <p className={style.enderecoCampo}>{infoCampo.endereco}</p>
                    </div>
                    <div className={style.divDescricaoCampo}>
                        <h2>Descrição</h2>
                        <p className={style.descricaoCampo}>{infoCampo.descricao}</p>
                    </div>
                    <div className={style.contatoCampo}>
                        <p>Caso não tenha encontrado uma informação que deseja aqui,
                            entre em contato conosco
                        </p>
                    </div>
                    </div>
                    <div className={style.divImagensCampo}>
                        <h2>Fotos do campo</h2>
                        <img src={"/images/imageCampoFutebol.png"} alt="imagem do campo"/>
                        <img src={"/images/imageCampoFutebol.png"} alt="imagem do campo" />
                    </div>
                    
                </div>
                </div>
            </>
        }
    }

const { register, handleSubmit, setValue, formState: { errors } } = useForm<iAgendamento>({
    resolver: zodResolver(createAgendamentoSchema),
    mode: "onBlur"
});

const getHorarios = async() => {
const horarios = await apiController.get("/horarios")
setHorarios(horarios)
}

useEffect(() => {
getHorarios()
}, [])
useEffect(() => {
    if(infoCampo.id) setValue("camposId", infoCampo.id);
}, [infoCampo, setValue]);

useEffect(() => {
    if(retrieve?.id) setValue("usuariosId", retrieve.id);
}, [retrieve, setValue]);

    const Agendar = async(agendamentoData:iAgendamento) => {
        try{
            const dataFormatada = agendamentoData.data.split("-").reverse().join("/")
            const agendamentoDataNovo = { ...agendamentoData, data: dataFormatada}
            const res = await apiController.post("/agendamentos", agendamentoDataNovo)
            console.log(res)
            if(res){
                toastbar.success("Campo agendado com sucesso!")
            }
        }catch(error:any){
        console.log(error, "erro")
        toastbar.error(error.response.data.message)
      }
    }


   return  <div className={style.load}>
    <header className={style.headerAgendar}>
    <div className={style.divBtnVoltar}>
        
<Link to={"/"} className={style.btnVoltar}>Voltar</Link>


        </div>

            <div className={style.divHeaderDireita}>
                 <div className={style.divVisualizar}>
            
            <button onClick={() => setmodalVisualizarOpen(true)} className={style.btnVisualizar}>Ver meus Agendamentos</button>
        </div>
            <h1 className={style.h1Agendar}>Agendamentos</h1>

            </div>
    </header>

    {modalCamposOpen && <OpenModalCampos />}
    {modalVisualizarOpen && <OpenModalVisualizar />}
    {modalInfoOpen && <OpenModalInfo />}
    {modalAvisoOpen && <ModalAviso />}

    <h2 className={style.h2Agendamento}>Agende seu campo de futebol</h2>
    <div className={style.divPrincipalAgendamento}>
        <div className={style.divOne}> 
    <form className={style.formAgendamento} onSubmit={handleSubmit(Agendar)}>
        <div className={style.divCampoForm}>
        <div className={style.divEscolhaCampo}>
      <h3>Escolha o campo disponível</h3>
      <input type="text" className={style.inputCampoNome} value={infoCampo.nome} readOnly placeholder="Clique em 'Escolha um campo'"/>
      <input {...register("camposId")} type="hidden" />
      <input {...register("usuariosId")} type="hidden" />

        <button type="button" onClick={() => campos.length < 1 ? setModalAvisoOpen(true) : setModalCamposOpen(true)} 
        className={style.btnEscolhaDoCampo}>Escolher um campo</button>
        {errors.camposId && errors.camposId && (
              <span className={style.errorMsg}>
                {errors.camposId.message}
              </span>
            )}
        </div>
       
        <div className={style.divEscolhaHorario}>
            <h3>Escolha o horario disponivel</h3>
            <select {...register("horario")} className={style.selectInput}>
  <option value="">-</option>
  {horarios.map((horario: iHorario) => ( 
    <option key={horario.id} value={horario.horario_inicial}>
      {horario.horario_inicial}
    </option>
  ))}

            {errors.horario && (
  <span className={style.errorMsg}>
    {errors.horario.message}
  </span>
)}
            </select>
        </div>
        </div>
        <div className={style.divDataForm}>
        <div className={style.divEscolhaData}>
            <h3>Escolha a data do agendamento</h3>
            <input {...register("data")}type="date" className={style.inputAgendar}/>
            {errors.data && errors.data && (
              <span className={style.errorMsg}>
                {errors.data.message}
              </span>
            )}

            </div>
            
        </div>
        <div className={style.divBtnAgendar}>
            <button className={style.btnAgendar} type="submit">Agendar</button>
            </div>
        </form>

       
</div>
            
    
    </div>
    
    </div>



    
}