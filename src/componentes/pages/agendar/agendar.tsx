import { Link, useNavigate } from "react-router-dom"
import style from "./agendar.module.css"
import { useEffect, useState } from "react"
import { apiController } from "../../../controller/api.controller"
import { Iconify } from "../../iconify/iconify"
import { useForm } from "react-hook-form"
import { createAgendamentoSchema, type iAgendamento, type iReturnAgendamento } from "../../../schemas/agendamento.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toastbar } from "../../utility/tokenUtility"
import { OpenModalCampos } from "../../modals/modalAgendaCamposDisponiveis/modalCamposDisponiveis"
import { OpenModalVisualizar } from "../../modals/modalMeusAgendamentos/modalMeusAgendamentos"





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
   agendamentos: [
		{
			id: number,
			campos: {
				id: number,
				nome: string,
				endereco: string,
				descricao: string,
				valor: number,
				imagem: string
			},
			horario: string,
			data: string
		}
		
	]
    
   }


    const [campos, setCampos] = useState([] as iCampos[])
    const [horarios, setHorarios] = useState([] as iHorario[])
    const [modalCamposOpen, setModalCamposOpen] = useState(false)
    const [campoId, setCampoId] = useState<number | null>(null)
    const [infoCampo, setInfoCampo] = useState<iCampos>({} as iCampos)
    const [modalAvisoOpen, setModalAvisoOpen] = useState(false)
    const [retrieve, setRetrieve] = useState<iUser|null>()
    const [modalVisualizarOpen, setmodalVisualizarOpen] = useState(false)
    const [diaDaSemana, setDiaDaSemana] = useState("")
    const [horarioInicial, setHorarioInicial] = useState<number | null>()
    const [horarioFinal, setHorarioFinal] = useState<number | null>()
    const [listaHorarios, setListaHorarios] = useState<string[]>([])
    
    
    const getRetrieve = async() => {
        const retrieve = await apiController.get("/usuarios/retrieve")
        console.log(retrieve,"retrive")
        setRetrieve(retrieve)
        await getCampos(retrieve)
    } 

    const getCampos = async(retrieve:any) => {
        if(retrieve?.admin === true){

            const campos = await apiController.get("/campos")
            setCampos(campos.data)
        }else{
            const campos = await apiController.get("/campos?status=ativo")
            setCampos(campos.data)
        }
    }

    const fecharModalAviso = () => {
        setModalAvisoOpen(false)
        getCampos(retrieve)
    }
    useEffect(() =>{
            const token = localStorage.getItem("token")
            if(!token){
                navigate("/login")
            }
        getRetrieve()   
        console.log("testeInicio")
     
    }, [])
    
     useEffect(() => {
        console.log(infoCampo)
    }, [infoCampo])

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

const { register, handleSubmit, setValue, formState: { errors } } = useForm<iAgendamento>({
    resolver: zodResolver(createAgendamentoSchema),
    mode: "onBlur"
});

const getHorarios = async () => {
  if (campoId && diaDaSemana) {
    
    try {
      const res = await apiController.get(
        `/horarios/${campoId}/${diaDaSemana}`
      ) 
    console.log(res,"horarios api")
    if(res && res.length > 0){
          setHorarios(res)
        toastbar.success("Horários disponíveis nesse dia e nesse campo!")
    }else{
        toastbar.error("Nenhum horário disponível neste dia e neste campo!") 
      }
   
    } catch (error) {
        toastbar.error("Erro ao consultar os horarios!")

    }
  }
}


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
    console.log(campoId)
}, [campoId])

useEffect(() => {
  if (horarios.length > 0) {
    const list: string[] = []

    horarios.forEach((horario) => {
      const inicio = parseInt(horario.horario_inicial)
      
      setHorarioInicial(inicio)
      const fim = parseInt(horario.horario_final)
      setHorarioFinal(fim)
      const agendamentos = horario.agendamentos.length ? horario.agendamentos.map((agendamento)=>agendamento.horario):[]
      console.log(agendamentos,"agendamentos")
      for (let i = inicio; i < fim; i++) {
        console.log(horario.agendamentos,"agenda")
        
        if(!agendamentos.includes(`${i}:00`)){

            list.push(`${i}:00`)
        }
          

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
            const res = await apiController.post("/agendamentos", {...agendamentoDataNovo, status: "ativo"} )
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

    {modalCamposOpen && <OpenModalCampos 
    isOpen={modalCamposOpen} 
    onClose={() => setModalCamposOpen(false)}
    onSelectCampo={(id, infoCampo) => (setValue("camposId", id), setInfoCampo(infoCampo), setCampoId(id))}
    />}
    {modalVisualizarOpen && <OpenModalVisualizar 
    isOpen={modalVisualizarOpen} 
    onClose={() => setmodalVisualizarOpen(false)}
    />}
    {modalAvisoOpen && <ModalAviso />}

    <main className={style.mainAgendamentos}>
      <div className={style.elementoSeparado}>
    <h2 className={style.h2Agendamento}>Agende seu campo de futebol</h2>

    </div>
        <div className={style.agendamentoFormularioDiv}>
    
    <div className={style.divPrincipalAgendamento}>
        <div className={style.divOne}> 
    <form className={style.formAgendamento} onSubmit={handleSubmit(Agendar)}>
        <div className={style.divCampoForm}>
        <div className={style.divEscolhaCampo}>
      <h3>Escolha o campo disponível</h3>
      <input type="text" className={style.inputCampoNome} value={infoCampo.nome} readOnly placeholder="Clique em 'Escolher um campo'"/>
      <input {...register("camposId")} type="hidden" />
      <input {...register("usuariosId")} type="hidden" />

        <button type="button" onClick={() => campos.length > 1 ? setModalCamposOpen(true) : setModalAvisoOpen(true)} 
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
        <div className={style.divBtnsForm}>
            <button className={style.btnAgendar} type="submit">Agendar</button>
            <button className={style.btnLimpar} type="reset">Limpar</button>
            </div>
        </form>

       
</div>
            
    
    </div>
    </div>
</main>
    </div>


    
}