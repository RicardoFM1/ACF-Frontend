import { Link, useNavigate } from "react-router-dom"
import style from "./agendar.module.css"
import { useEffect, useState } from "react"
import { apiController } from "../../../controller/api.controller"
import { Iconify } from "../../iconify/iconify"
import { useForm } from "react-hook-form"
import { createAgendamentoSchema, type iAgendamento, type iReturnAgendamento } from "../../../schemas/agendamento.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toastbar } from "../../utility/tokenUtility"
import { toast } from "react-toastify"




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
    const [searchAgendamento, setSearchAgendamento] = useState("")
    const [searchCampo, setSearchCampo] = useState("")
    const [modalCamposOpen, setModalCamposOpen] = useState(false)
    const [modalInfoOpen, setModalInfoOpen] = useState(false)
    const [campoId, setCampoId] = useState<number | null>(null)
    const [infoCampo, setInfoCampo] = useState<iCampos>({} as iCampos)
    const [modalAvisoOpen, setModalAvisoOpen] = useState(false)
    const [retrieve, setRetrieve] = useState<iUser|null>()
    const [modalVisualizarOpen, setmodalVisualizarOpen] = useState(false)
    const [diaDaSemana, setDiaDaSemana] = useState("")
    const [horarioInicial, setHorarioInicial] = useState<number | null>()
    const [horarioFinal, setHorarioFinal] = useState<number | null>()
    const [listaHorarios, setListaHorarios] = useState<string[]>([])
    // const [loadingHorarios, setLoadingHorarios] = useState(false)

    const getRetrieve = async() => {
        const retrieve = await apiController.get("/usuarios/retrieve")
        setRetrieve(retrieve)
    } 

    const getCampos = async() => {
        const campos = await apiController.get("/campos")
        setCampos(campos)
    }

    const camposFiltrados = campos.filter(c =>
        c.nome.toLowerCase().includes(searchCampo.toLowerCase())
    )

    const getAgendamentos = async() => {
        const retrieveId = retrieve?.id
        const agendamentos = await apiController.get(`/agendamentos/usuario/${retrieveId}`)
        setAgendamentos(agendamentos)
    }

    const agendamentosFiltrados = agendamentos.filter(a =>
        a.campos.nome.toLowerCase().includes(searchAgendamento.toLowerCase())
    )
    setAgendamentos(agendamentosFiltrados)
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
                setValue("camposId",campoId)
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
    
    // useEffect(() => {
    //    console.log(agendamentos)
    // }, [agendamentos])

    useEffect(() =>{
        console.log(searchAgendamento, "renderizou search")
    }, [searchAgendamento])
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
                <input 
                id="idPesquisaCampo" 
                value={searchCampo} 
                onChange={(e) =>setSearchCampo(e.target.value)}
                className={style.inputSearch} 
                type="search" 
                placeholder="Pesquise um campo" />
                <div className={style.divFiltro}>
                <p>Filtrar</p>
                <select className={style.selectFiltro} name="filtroCampoName" id="filtroCampo">
                    
                    <option value="">Data</option>
                    <option value="">Horario</option>
                    <option value="">Preço</option>
                </select>
                </div>
                </div>
                {camposFiltrados.map((campo:iCampos) => (
                    
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
                <input 
                id="idPesquisaAgendamento" 
                value={searchAgendamento} 
                onChange={(e) =>setSearchAgendamento(e.target.value)}
                className={style.inputSearch} 
                type="search" 
                placeholder="Pesquise um agendamento" />
                <div className={style.divFiltro}>
                <p>Filtrar</p>
                <select className={style.selectFiltro} name="filtroAgendamentoName" id="filtroAgendamento">
                    
                    <option value="">Data</option>
                    <option value="">Horario</option>
                    <option value="">Preço</option>
                </select>
                </div>
                </div>
                {agendamentosFiltrados.map((agendamento:iReturnAgendamento) => (
                    
                    <div className={style.fundoAgendamento}>
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
        }else{
            return <></>
        }
    }

const { register, handleSubmit, setValue, formState: { errors } } = useForm<iAgendamento>({
    resolver: zodResolver(createAgendamentoSchema),
    mode: "onBlur"
});

const getHorarios = async () => {
  if (campoId && diaDaSemana) {
    // let toastId: string | number | undefined
    try {
    //   toastId = toast.loading("Consultando horários...")
    //   setLoadingHorarios(true)

      const horarios = await apiController.get(
        `/horarios/${campoId}/${diaDaSemana.toLowerCase()}`
      )
      setHorarios(horarios)
      if(horarios.length > 0){
        toastbar.success("Horários disponíveis nesse dia e nesse campo!")
    }else{
        toastbar.error("Nenhum horário disponível neste dia e neste campo!") 
      }
    //   toast.update(toastId, {
    //     render: "Consultado com sucesso!",
    //     type: "success",
    //     isLoading: false,
    //     autoClose: 3000
    //   })
    } catch (error) {
        toastbar.error("Erro ao consultar os horarios!")
    //   toast.update(toastId!, {
    //     render: "Erro ao consultar horários",
    //     type: "error",
    //     isLoading: false,
    //     autoClose: 3000
    //   })
    // } finally {
    //   setLoadingHorarios(false)
    }
  }
}

// useEffect(() => {
//     if(campoId && diaDaSemana){
//         let toastId: string | number | undefined
//         if(loadingHorarios === true){
//             toastId = toast.loading("Consultando horários...")
//         }
//         else{
//             toast.success("Consultado com sucesso!")
//         }
//         if (toastId) toast.dismiss(toastId)
//     }
// }, [loadingHorarios])

const diaDaSemanaFormatada=(dia:string)=>{
    const date = new Date(dia)
    console.log(date.getHours(),"date")
    date.setHours(date.getHours()+3);
     console.log(date.getHours(),"date 2")
    const days = ["domingo","segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sabado"]
    setDiaDaSemana(days[date.getDay()])

    console.log(days[date.getDay()], date,new Intl.DateTimeFormat("pt-BR",{
        timeZone:"America/Sao_Paulo",
        weekday:"long"
    }).format(date))
}

useEffect(() => {
getHorarios()
}, [])

useEffect(() => {
  if (horarios.length > 0) {
    const list: string[] = []

    horarios.forEach((horario) => {
      const inicio = parseInt(horario.horario_inicial)
      setHorarioInicial(inicio)
      const fim = parseInt(horario.horario_final)
      setHorarioFinal(fim)
      for (let i = inicio; i < fim; i++) {
          list.push(`${i}:00`)
        }
    })
    setListaHorarios(list)
    
  } else {
    setListaHorarios([]) 
  }
}, [horarios])
useEffect(() => {
    console.log(horarioInicial)
    console.log(horarioFinal)
  
}, [horarioInicial, horarioFinal])

useEffect(() => {
    if(infoCampo){
        if(infoCampo.id) setValue("camposId", infoCampo.id);
    }

}, [infoCampo, setValue]);

useEffect(() => {
    if(retrieve?.id) setValue("usuariosId", retrieve.id);
}, [retrieve, setValue]);

useEffect(() => {
  if (campoId && diaDaSemana) {
    getHorarios()
  }
}, [campoId, diaDaSemana])


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
        {retrieve?.admin === true ?
            <Link to={"/admin"} className={style.btnVoltar}>Voltar</Link>
        : <Link to={"/"} className={style.btnVoltar}>Voltar</Link>}



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
      <input type="text" className={style.inputCampoNome} value={infoCampo.nome} readOnly placeholder="Clique em 'Escolher um campo'"/>
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
       
        
        </div>
        <div className={style.divDataForm}>
        <div className={style.divEscolhaData}>
            <h3>Escolha a data do agendamento</h3>
            <input {...register("data")} onChange={(e)=>diaDaSemanaFormatada(e.target.value)} type="date" className={style.inputAgendar}/>
            {errors.data && errors.data && (
              <span className={style.errorMsg}>
                {errors.data.message}
              </span>
            )}

            </div>
            <div className={style.divEscolhaHorario}>
            <h3>Escolha o horario disponivel</h3>
            <select {...register("horario")} className={style.selectInput}>
  <option value="">-</option>
  {listaHorarios.map((listaHorario: string) => ( 
    <option value={listaHorario}>
      {listaHorario}
    </option>
  ))}

            </select>
            {errors.horario && (
  <span className={style.errorMsg}>
    {errors.horario.message}
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