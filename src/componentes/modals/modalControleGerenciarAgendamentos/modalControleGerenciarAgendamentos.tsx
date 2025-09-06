import { useState, useEffect } from "react";
import { apiController } from "../../../controller/api.controller";
import type { iReturnAgendamento } from "../../../schemas/agendamento.schema";
import { Iconify } from "../../iconify/iconify";
import type { modalProps } from "../modalsInterface/modalInterface";
import style from "./modalControleGererenciarAgendamentos.module.css"
import { toastbar } from "../../utility/tokenUtility";



export const OpenModalAgendamentos = ({isOpen, onClose}:modalProps) => {
    const [agendamentos, setAgendamentos] = useState([] as iReturnAgendamento[])
    const [searchAgendamento, setSearchAgendamento] = useState("");
    const [optionChecked, setOptionChecked] = useState("");
      
    interface iAgendamento{
        id: number,
        status: string
    }

     const getAgendamentos = async() => {
        const agendamentos = await apiController.get(`/agendamentos`)
        setAgendamentos(agendamentos)
    }

    const updateAgendamentos = async (agendamentoData: iAgendamento) => {

  const novoStatus = agendamentoData.status === "ativo" ? "inativo" : "ativo";

  try {
    const res = await apiController.patch(`/agendamentos/${agendamentoData.id}`, { status: novoStatus });

    if (res) {
      toastbar.success(
        novoStatus === "ativo"
          ? "Agendamento ativado com sucesso!"
          : "Agendamento desativado com sucesso!"
      );

      setAgendamentos((prev) =>
        prev.map((a) =>
          a.id === agendamentoData.id ? { ...a, status: novoStatus } : a
        )
      );
    }
  } catch (error: any) {
    console.log(error.response?.data?.message);
    toastbar.error("Erro ao atualizar o status do agendamento!");
  }
};



    useEffect(() =>{
        getAgendamentos()
        setOptionChecked("campo")
    }, [])

        if(isOpen){
    return <>
    
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
                        <p title={agendamento.campos.nome}><strong>{agendamento.campos.nome}</strong></p>
                    </div>
                    
                    <div className={style.divDateTimeAgendamento}>
                    
                    {agendamento.status === "ativo" ?
                    <div className={style.divStatus}>
                    <p title={agendamento.status} className={style.statusAtivo}><strong>{agendamento.status}</strong></p>
                    </div>
                :
                 <div className={style.divStatus}>
                <p title={agendamento.status} className={style.statusInativo}><strong>{agendamento.status}</strong></p>
                </div>
                }
                <div className={style.divAgendamentoUser}>
                   <p title={agendamento.usuarios.email}><strong>{agendamento.usuarios.email}</strong></p>
                </div>
                    <div className={style.agendamentoData}>
                    <p title={agendamento.data}><strong>{agendamento.data}</strong></p>
                    </div>
                    <div className={style.agendamentoHorario}>
                    <p title={agendamento.horario ? agendamento.horario : "N/A"}><strong>{agendamento.horario ? agendamento.horario : "N/A"}</strong></p>
                    </div>
                    </div>
                    </div>
                    <div className={style.divBtnsModalCampo}>
                        <button onClick={() => updateAgendamentos(agendamento)} className={style.mudarStatus}>Mudar status</button>
                        <div className={style.divPrecoCampo}>
                        <p title={"R$" + String(agendamento.campos.valor/100)}><strong>R${agendamento.campos.valor/100}</strong></p>
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