import { useEffect, useState } from "react"
import type { iReturnAgendamento } from "../../../schemas/agendamento.schema"
import { Iconify } from "../../iconify/iconify"
import type { iUser, modalProps } from "../modalsInterface/modalInterface"
import style from "./modalMeusAgendamentos.module.css"
import { apiController } from "../../../controller/api.controller"
import { OpenModalInfo } from "../modalAgendaInfoCampo/modalAgendaInfoCampo"


export const OpenModalVisualizar = ({isOpen, onClose}:modalProps) => {
    const [agendamentos, setAgendamentos] = useState([] as iReturnAgendamento[])
    const [searchAgendamento, setSearchAgendamento] = useState("")
    const [retrieve, setRetrieve] = useState<iUser|null>()
    const [modalInfoOpen, setModalInfoOpen] = useState(false);
    const [campoId, setCampoId] = useState<number | null>(null);
       
const options= [{
        id:1,name:"Data"},
        {
        id:2,name:"Preço"
    }]

        const getRetrieve = async() => {
        const retrieve = await apiController.get("/usuarios/retrieve")
        console.log(retrieve,"retrive")
        setRetrieve(retrieve)
        await getAgendamentos(retrieve.id)
    } 

     const getAgendamentos = async(id:string) => {
        const retrieveId = id
        const agendamentos = await apiController.get(`/agendamentos/usuario/${retrieveId}`)
        setAgendamentos(agendamentos)
    }

  const clickInformacoes = (id: number) => {
    setModalInfoOpen(true);
    setCampoId(id);
  };

    useEffect(() =>{
        getRetrieve()
    }, [])

        if(isOpen){
    return <>
    {modalInfoOpen && <OpenModalInfo
          isOpen={modalInfoOpen} 
          campoId={campoId} 
          onClose={() => setModalInfoOpen(false)}
           />}
        <div className={style.fundoModal}> 
                <div className={style.tituloModalVisualizar}>
                    <h2>Meus agendamentos</h2>
                    <div className={style.divBtnFecharModal}>
                    <button className={style.btnFecharModal} onClick={onClose}>
                        <Iconify icon="ic:baseline-close"/>
                    </button>
                    </div>
                </div>
                <div className={style.modal}>
                <div className={style.divPesquisa}>
                <input 
                id="idPesquisaAgendamento" 
                value={searchAgendamento} 
                onChange={(e:any) => setSearchAgendamento(e.target.value)}
                className={style.inputSearch} 
                placeholder="Pesquise um agendamento" />
                <div className={style.divFiltro}>
                <p>Filtrar</p>
                <select  className={style.selectFiltro} name="filtroAgendamentoName" id="filtroAgendamento">
                   {options.map((option)=>{
                    return <option id={String(option.id)} value={option.id}>
                            {option.name}
                    </option>
                   })} 
                
                </select>

                </div>
                </div>
                {agendamentos.filter((agendamento) => agendamento.campos.nome.toLowerCase().includes
                (searchAgendamento.toLowerCase()))
                .map((agendamento:iReturnAgendamento) => (
                    <div key={agendamento.id}>
                    <div  className={style.fundoAgendamento}>
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
            </div>
            ))}
                </div>

            </div>
            </>
        
    
    }else{
        return <></>
    }
    }