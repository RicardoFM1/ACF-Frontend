import { useState, useEffect } from "react";
import { apiController } from "../../../controller/api.controller";
import type { iReturnAgendamento } from "../../../schemas/agendamento.schema";
import { Iconify } from "../../iconify/iconify";
import type { modalProps } from "../modalsInterface/modalInterface";
import style from "./modalControleGererenciarAgendamentos.module.css";
import { toastbar } from "../../utility/tokenUtility";

export const OpenModalAgendamentos = ({
  isOpen,
  onClose,
  onAtualizarHorarios,
}: modalProps) => {
  const [agendamentos, setAgendamentos] = useState([] as iReturnAgendamento[]);
  const [searchAgendamento, setSearchAgendamento] = useState("");
  const [optionChecked, setOptionChecked] = useState("");

  interface iAgendamento {
    id: number;
    status: string;
    camposId: number;
    horario: string;
    data: string;
    valor: number
  }

  const getAgendamentos = async () => {
    const agendamentos = await apiController.get(`/agendamentos`);
    setAgendamentos(agendamentos);

  };

  const updateAgendamentos = async (agendamentoData: iAgendamento) => {
    const novoStatus = agendamentoData.status === "ativo" ? "inativo" : "ativo";

    if (novoStatus === "ativo") {
      const conflito = agendamentos.find(
        (a) =>
          a.status === "ativo" &&
          a.campos.id === agendamentoData.camposId &&
          a.data === agendamentoData.data &&
          a.horario === agendamentoData.horario
      );

      if (conflito) {
        toastbar.error(
          "Não é possível ativar este agendamento: já existe outro ativo no mesmo horário e campo!"
        );
        return;
      }
    }

    try {
      const res = await apiController.patch(
        `/agendamentos/${agendamentoData.id}`,
        { status: novoStatus }
      );

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

        if (onAtualizarHorarios) onAtualizarHorarios();
      }
    } catch (error: any) {
  
      toastbar.error("Erro ao atualizar o status do agendamento!");
    }
  };

  useEffect(() => {
    getAgendamentos();
    setOptionChecked("campo");
  }, []);

  if (isOpen) {
    return (
      <>
        <div className={style.fundoModal}>
          <div className={style.tituloModalVisualizar}>
            <h2>Gerenciar agendamentos</h2>
            <div className={style.divBtnFecharModal}>
              <button className={style.btnFecharModal} onClick={onClose}>
                <Iconify icon="ic:baseline-close" />
              </button>
            </div>
          </div>
          <div className={style.modal}>
            <div className={style.divPesquisa}>
              {optionChecked === "campo" ? (
                <input
                  id="idPesquisaAgendamento"
                  value={searchAgendamento}
                  onChange={(e: any) => setSearchAgendamento(e.target.value)}
                  className={style.inputSearch}
                  placeholder="Pesquise um agendamento (por nome do campo)"
                />
              ) : optionChecked === "preco" ? (
                <input
                  id="idPesquisaAgendamento"
                  value={searchAgendamento}
                  onChange={(e: any) => setSearchAgendamento(e.target.value)}
                  className={style.inputSearch}
                  type="text"
                  placeholder="Pesquise um agendamento (por preço)"
                />
              ) : (
                <input
                  id="idPesquisaAgendamento"
                  value={searchAgendamento}
                  onChange={(e: any) => setSearchAgendamento(e.target.value)}
                  onKeyDown={(e) => e.preventDefault()}
                  className={style.inputSearch}
                  type="date"
                  placeholder="Pesquise um agendamento (por data)"
                />
              )}

              <div className={style.divFiltro}>
                <p>Filtrar</p>
                <select
                  onChange={(e) => setOptionChecked(e.target.value)}
                  className={style.selectFiltro}
                  name="filtroAgendamentoName"
                  id="filtroAgendamento"
                >
                  <option value="campo">Campo</option>
                  <option value="data">Data</option>
                  <option value="preco">Preço</option>
                </select>
              </div>
            </div>
            
            {agendamentos
              .filter((agendamento) => {
                if (optionChecked === "campo") {
                  return agendamento.campos.nome
                    .toLowerCase()
                    .includes(searchAgendamento.toLowerCase());
                }
                if (optionChecked === "data") {
                  const dataInputFormatada = searchAgendamento
                    .split("-")
                    .reverse()
                    .join("/");
                  return agendamento.data
                    .toLowerCase()
                    .includes(dataInputFormatada.toLowerCase());
                } else {
                  return String(agendamento.campos.valor).includes(
                    searchAgendamento
                  );
                }
              })
              .map((agendamento: iReturnAgendamento) => (
                <div key={agendamento.id}>
                  <div className={style.fundoAgendamento}>
                    <div className={style.divCimaModal}>
                      <div className={style.divNomeCampo}>
                        <p title={agendamento.campos.nome}>
                          <strong>{agendamento.campos.nome}</strong>
                        </p>
                      </div>

                      <div className={style.divDateTimeAgendamento}>
                        {agendamento.status === "ativo" ? (
                          <div className={style.divStatus}>
                            <p
                              title={agendamento.status}
                              className={style.statusAtivo}
                            >
                              <strong>{agendamento.status}</strong>
                            </p>
                          </div>
                        ) : (
                          <div className={style.divStatus}>
                            <p
                              title={agendamento.status}
                              className={style.statusInativo}
                            >
                              <strong>{agendamento.status}</strong>
                            </p>
                          </div>
                        )}
                        <div className={style.divAgendamentoUser}>
                          <p title={agendamento.usuarios.email}>
                            <strong>{agendamento.usuarios.email}</strong>
                          </p>
                        </div>
                        <div className={style.agendamentoData}>
                          <p title={agendamento.data}>
                            <strong>{agendamento.data}</strong>
                          </p>
                        </div>
                        <div className={style.agendamentoHorario}>
                          <p
                            title={
                              agendamento.horario ? agendamento.horario : "N/A"
                            }
                          >
                            <strong>
                              {agendamento.horario
                                ? agendamento.horario
                                : "N/A"}
                            </strong>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={style.divBtnsModalCampo}>
                      <button
                        onClick={() =>
                          updateAgendamentos({
                            id: agendamento.id,
                            status: agendamento.status,
                            camposId: agendamento.campos.id,
                            data: agendamento.data,
                            horario: agendamento.horario,
                            valor: agendamento.campos.valor
                          })
                        }
                        className={style.mudarStatus}
                      >
                        Mudar status
                      </button>
                      <div className={style.divPrecoCampo}>
                        <p
                          title={"R$" + String(agendamento.campos.valor / 100)}
                        >
                          
                          <strong>R${(agendamento.campos.valor /100).toFixed(2).replace(".", ",")}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
