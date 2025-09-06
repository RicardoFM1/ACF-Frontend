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
    const [optionChecked, setOptionChecked] = useState("")
       

        const getRetrieve = async() => {
        const retrieve = await apiController.get("/usuarios/retrieve")
        console.log(retrieve,"retrive")
        setRetrieve(retrieve)
        await getAgendamentos(retrieve.id)
    } 

     const getAgendamentos = async(id:string) => {
        const retrieveId = id
        if(retrieve?.admin === true){
            const agendamentos = await apiController.get(`/agendamentos/usuario/${retrieveId}`)
            setAgendamentos(agendamentos)
        }else{
            const agendamentos = await apiController.get(`/agendamentos/usuario/${retrieveId}?status=ativo`)
            setAgendamentos(agendamentos)
        }
    }

  const clickInformacoes = (id: number) => {
    setModalInfoOpen(true);
    setCampoId(id);
  };

    useEffect(() =>{
        getRetrieve()
        setOptionChecked("campo")
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
                {optionChecked === "campo" ? 
                <input 
                id="idPesquisaAgendamento" 
                value={searchAgendamento} 
                onChange={(e:any) => setSearchAgendamento(e.target.value)}
                className={style.inputSearch} 
                placeholder="Pesquise um agendamento (por nome do campo)" />
                :
                optionChecked ==="preco" ?
                <input 
                id="idPesquisaAgendamento" 
                value={searchAgendamento} 
                onChange={(e:any) => setSearchAgendamento(e.target.value)}
                className={style.inputSearch} 
                type="text"
                placeholder="Pesquise um agendamento (por preço)" />
                :
                <input 
                id="idPesquisaAgendamento" 
                value={searchAgendamento} 
                onChange={(e:any) => setSearchAgendamento(e.target.value)}
                className={style.inputSearch} 
                type="date"
                placeholder="Pesquise um agendamento (por data)" />
                }
                

                <div className={style.divFiltro}>
                <p>Filtrar</p>
                <select onChange={(e) => setOptionChecked(e.target.value)} 
                className={style.selectFiltro} 
                name="filtroAgendamentoName" 
                id="filtroAgendamento">
                   <option value="campo">Campo</option>
                   <option value="data">Data</option>
                   <option value="preco">Preço</option>

                </select>

                </div>
                </div>
                <p>{parseInt(searchAgendamento.split("-")[0])>2025}</p>
                <p>{searchAgendamento}</p>
                {agendamentos.filter((agendamento) =>{

                    if(optionChecked === "campo"){
                    return agendamento.campos.nome.toLowerCase().includes(searchAgendamento.toLowerCase())
                    }
                    if(optionChecked === "data"){
                        return agendamento.data.toLowerCase().includes(searchAgendamento.toLowerCase())
                    }
                    else{
                        return String(agendamento.campos.valor).includes(searchAgendamento)
                    }
                }
                )
                .map((agendamento:iReturnAgendamento) => (
                    <div key={agendamento.id}>
                    <div  className={style.fundoAgendamento}>
                    <div className={style.divCimaModal}>
                    <div className={style.divNomeCampo}>
                        <p><strong>{agendamento.campos.nome}</strong></p>
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
                        <p ><strong>R${agendamento.campos.valor/100}</strong></p>
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