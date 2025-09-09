import { Link, useNavigate } from "react-router-dom";
import style from "./agendar.module.css";
import { useEffect, useState } from "react";
import { apiController } from "../../../controller/api.controller";
import { Iconify } from "../../iconify/iconify";
import { useForm } from "react-hook-form";
import {
  createAgendamentoSchema,
  type iAgendamento
} from "../../../schemas/agendamento.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toastbar } from "../../utility/tokenUtility";
import { OpenModalCampos } from "../../modals/modalAgendaCamposDisponiveis/modalCamposDisponiveis";
import { OpenModalVisualizar } from "../../modals/modalMeusAgendamentos/modalMeusAgendamentos";

export const Agendar = () => {
  const navigate = useNavigate();

  interface iCampos {
    id: number;
    nome: string;
    endereco: string;
    descricao: string;
    valor: number;
    imagem: string;
    status?: string;
  }

  interface iUser {
    id: number;
    email: string;
    admin: boolean;
  }

  interface iHorario {
    id: number;
    dia_da_semana: string;
    horario_inicial: string;
    horario_final: string;
    campos: iCampos;
    agendamentos: [
      {
        id: number;
        campos: iCampos;
        horario: string;
        data: string;
        status: string;
      }
    ];
  }

  const [campos, setCampos] = useState<iCampos[]>([]);
  const [horarios, setHorarios] = useState<iHorario[]>([]);
  const [modalCamposOpen, setModalCamposOpen] = useState(false);
  const [campoId, setCampoId] = useState<number | null>(null);
  const [infoCampo, setInfoCampo] = useState<iCampos>({} as iCampos);
  const [modalAvisoOpen, setModalAvisoOpen] = useState(false);
  const [retrieve, setRetrieve] = useState<iUser | null>();
  const [modalVisualizarOpen, setmodalVisualizarOpen] = useState(false);
  const [diaDaSemana, setDiaDaSemana] = useState("");
  const [listaHorarios, setListaHorarios] = useState<string[]>([]);

  const getRetrieve = async () => {
    const retrieve = await apiController.get("/usuarios/retrieve");
    setRetrieve(retrieve);
    await getCampos(retrieve);
  };

  const getCampos = async (retrieve: any) => {
    if (retrieve.id && retrieve?.admin === true) {
      const campos = await apiController.get("/campos");
      setCampos(campos.data);
    } else {
      const campos = await apiController.get("/campos?status=ativo");
      setCampos(campos.data);
    }
  };

  const atualizarHorarios = () => {
  if (campoId && diaDaSemana) {
    getHorarios();
  }
};

  const limparForm = () => {
    reset({
      camposId: 0,
      usuariosId: retrieve?.id || 0,
      status: "ativo",
      data: "",
      horario: "",
    });

    setInfoCampo({
      id: 0,
      nome: "",
      endereco: "",
      descricao: "",
      valor: 0,
      imagem: "",
      status: "ativo",
    });
    setCampoId(null);
    setDiaDaSemana("");
    setHorarios([]);
    setListaHorarios([]);
  };

  const fecharModalAviso = () => {
    setModalAvisoOpen(false);
    getCampos(retrieve);
  };

  const ModalAviso = () => {
    if (!modalAvisoOpen) return null;
    return (
      <div className={style.fundoModal}>
        <div className={style.modalAviso}>
          <div className={style.divIconAlerta}>
            <Iconify
              icon="mingcute:alert-fill"
              color="#A02525"
              height={58}
              width={58}
              className={style.iconAlerta}
            />
          </div>
          <h2>AVISO!</h2>
          <p>Não há nenhum campo registrado ainda.</p>
          <div className={style.divBtnModal}>
            <button className={style.btnOk} onClick={fecharModalAviso}>
              Ok
            </button>
          </div>
        </div>
      </div>
    );
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<iAgendamento>({
    resolver: zodResolver(createAgendamentoSchema),
    mode: "onBlur",
  });

  const getHorarios = async () => {
    if (campoId && diaDaSemana) {
      try {
        const res = await apiController.get(
          `/horarios/${campoId}/${diaDaSemana}`
        );
        if (res && res.length > 0) {
          setHorarios(res);
          toastbar.success("Horários disponíveis nesse dia e nesse campo!");
        } else {
          toastbar.error("Nenhum horário disponível neste dia e neste campo!");
          setHorarios([]);
        }
      } catch (error) {
        toastbar.error("Erro ao consultar os horarios!");
      }
    }
  };

  const diaDaSemanaFormatada = (dia: string) => {
    const date = new Date(dia);
    date.setHours(date.getHours() + 3);
    const days = [
      "domingo",
      "segunda-feira",
      "terca-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sabado",
    ];
    setDiaDaSemana(days[date.getDay()]);
  };

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    getRetrieve();
  }, []);

   

  useEffect(() => {
    if (horarios.length > 0) {
      const list: string[] = [];

      horarios.forEach((horario) => {
        const inicio = parseInt(horario.horario_inicial);
        
        const fim = parseInt(horario.horario_final);
       

     
        const agendamentosAtivos = horario.agendamentos
          .filter((ag) => ag.status === "ativo")
          .map((ag) => ag.horario);

        for (let i = inicio; i < fim; i++) {
          if (!agendamentosAtivos.includes(`${i}:00`)) {
            list.push(`${i}:00`);
          }
        }
      });

      setListaHorarios(list);
    } else {
      setListaHorarios([]);
    }
  }, [horarios]);



  useEffect(() => {
    if (retrieve?.id) setValue("usuariosId", retrieve.id);
  }, [retrieve, setValue]);

  useEffect(() => {
    if (campoId && diaDaSemana) getHorarios();
  }, [campoId, diaDaSemana]);

  const Agendar = async (agendamentoData: iAgendamento) => {
    try {
      if (!agendamentoData.camposId || !agendamentoData.usuariosId) {
        toastbar.error("Escolha um campo antes de agendar!");
        return;
      }
      const dataFormatada = agendamentoData.data
        .split("-")
        .reverse()
        .join("/");
      const agendamentoDataNovo = { ...agendamentoData, data: dataFormatada };
      const res = await apiController.post("/agendamentos", {
        ...agendamentoDataNovo,
        status: "ativo",
      });

      if (res) {
        toastbar.success("Campo agendado com sucesso!");
        limparForm();
     
        getHorarios();
      } else {
        toastbar.error("Não foi possível agendar o campo!");
      }
    } catch (error: any) {
      toastbar.error(error.response?.data?.message || "Erro ao agendar o campo!");
    }
  };


  return (
    <div className={style.load}>
      <header className={style.headerAgendar}>
        <div className={style.divBtnVoltar}>
          <Link
            to={retrieve?.admin === true ? "/admin" : "/"}
            className={style.btnVoltar}
          >
            Voltar
          </Link>
        </div>

        <div className={style.divHeaderDireita}>
          <div className={style.divVisualizar}>
            <button
              onClick={() => setmodalVisualizarOpen(true)}
              className={style.btnVisualizar}
            >
              Ver meus Agendamentos
            </button>
          </div>

          <h1 className={style.h1Agendar}>Agendamentos</h1>
        </div>
      </header>

      {modalCamposOpen && (
        <OpenModalCampos
          isOpen={modalCamposOpen}
          onClose={() => setModalCamposOpen(false)}
          onSelectCampo={(id, infoCampo) => (
            setValue("camposId", id), setInfoCampo(infoCampo), setCampoId(id)
          )}
        />
      )}

      {modalVisualizarOpen && (
        <OpenModalVisualizar
          isOpen={modalVisualizarOpen}
          onClose={() => setmodalVisualizarOpen(false)}
           onAtualizarHorarios={atualizarHorarios}
        />
      )}

      {modalAvisoOpen && <ModalAviso />}

      <main className={style.mainAgendamentos}>
        <div className={style.elementoSeparado}>
          <h2 className={style.h2Agendamento}>Agende seu campo de futebol</h2>
        </div>

        <div className={style.agendamentoFormularioDiv}>
          <div className={style.divPrincipalAgendamento}>
            <div className={style.divOne}>
              <form
                className={style.formAgendamento}
                onSubmit={handleSubmit(Agendar)}
              >
                <div className={style.divCampoForm}>
                  <div className={style.divEscolhaCampo}>
                    <h3>Escolha o campo disponível</h3>
                    <input
                      type="text"
                      id="infoCampoNomeInput"
                      className={style.inputCampoNome}
                      value={infoCampo.nome}
                      readOnly
                      placeholder="Clique em 'Escolher um campo'"
                    />
                    <input {...register("camposId")} type="hidden" />
                    <input {...register("usuariosId")} type="hidden" />
                    <input {...register("status")} type="hidden" value="ativo" />

                    <button
                      type="button"
                      onClick={() =>
                        campos.length < 1
                        ? setModalAvisoOpen(true)
                        : setModalCamposOpen(true)
                      }
                      className={style.btnEscolhaDoCampo}
                    >
                      Escolher um campo
                    </button>
                    {errors.camposId && (
                      <span className={style.errorMsg}>
                        {errors.camposId.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className={style.divDataForm}>
                  <div className={style.divEscolhaData}>
                    <h3>Escolha a data do agendamento</h3>
                    <input
                      {...register("data")}
                      onChange={(e) => diaDaSemanaFormatada(e.target.value)}
                      type="date"
                      className={style.inputAgendar}
                    />
                    {errors.data && (
                      <span className={style.errorMsg}>
                        {errors.data.message}
                      </span>
                    )}
                  </div>

                  <div className={style.divEscolhaHorario}>
                    <h3>Escolha o horário disponível</h3>
                    <select {...register("horario")} className={style.selectInput}>
                      <option value="">-</option>
                      {listaHorarios.map((listaHorario: string) => (
                        <option key={listaHorario} value={listaHorario}>
                          {listaHorario}
                        </option>
                      ))}
                    </select>
                    {errors.horario && (
                      <span className={style.errorMsg}>{errors.horario.message}</span>
                    )}
                  </div>
                </div>

                <div className={style.divBtnsForm}>
                  <button
                    className={style.btnAgendar}
                    type="submit"
                    disabled={!infoCampo.id || !retrieve?.id}
                  >
                    Agendar
                  </button>
                  <button
                    className={style.btnLimpar}
                    onClick={limparForm}
                    type="button"
                  >
                    Limpar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
