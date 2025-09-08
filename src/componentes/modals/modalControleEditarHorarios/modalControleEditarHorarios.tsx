import { useEffect, useState } from "react";
import style from "./modalControleEditarHorarios.module.css";
import { apiController } from "../../../controller/api.controller";
import { toast } from "react-toastify";

interface iHorario {
  dia_da_semana: string;
  horario_inicial: string;
  horario_final: string;
  camposId: number;
  status: "ativo" | "inativo";
}

interface ModalEditarHorariosProps {
  isOpen: boolean;
  onClose: () => void;
  campoId: number | null | undefined;
}

export const ModalEditarHorarios = ({ isOpen, onClose, campoId }: ModalEditarHorariosProps) => {
  const diasSemana = ["segunda-feira", "terca-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sabado", "domingo"];
  const [horarios, setHorarios] = useState<iHorario[]>([]);

  const getHorarios = async () => {
    if (!campoId) return;
    const novosHorarios: iHorario[] = [];
    for (const dia of diasSemana) {
     
       novosHorarios.push({
         dia_da_semana: dia.toLowerCase(),
         horario_inicial: "00:00",
         horario_final: "00:00",
         camposId: campoId,
         status: "inativo"
       });
    }
    setHorarios(novosHorarios);
  };


  const toMinutes = (hora: string) => {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  };

  useEffect(() => {
    if (isOpen) {
      setHorarios([]); 
      getHorarios();
    }
  }, [isOpen, campoId]);

  const handleChangeHorario = (dia: string, tipo: "inicial" | "final", value: string) => {
    setHorarios(prev =>
      prev.map(h => (h.dia_da_semana === dia ? { ...h, [`horario_${tipo}`]: value } : h))
    );
  };

  const salvarHorarios = async () => {
    if (!campoId) return;
    try {
      let horarioInvalido = false;

      const horariosAtualizados = horarios.map(horario => {
        const status = (horario.horario_final !== "00:00" || horario.horario_inicial !== "00:00") ? "ativo" : "inativo";
        if (toMinutes(horario.horario_final) < toMinutes(horario.horario_inicial)) {
          horarioInvalido = true;
        }
        return { ...horario, status };
      });

      if (horarioInvalido) {
        toast.error("O horário final não pode ser menor que o horário inicial!");
        return;
      }

      await apiController.patch(`/horarios/${campoId}`, horariosAtualizados);
      toast.success("Horários atualizados com sucesso!");
      onClose();

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao atualizar horários");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.load}>
      <div className={style.fundoModal}>
        <div className={style.editarHorarios}>
          <div className={style.headerEditarCampos}>
            <h2>Editar Horários</h2>
            <button className={style.btnFecharModal} onClick={onClose}>X</button>
          </div>
          <div className={style.bodyEditarHorarios}>
            {horarios.map(h => (
              <div key={h.dia_da_semana} className={style.caixaDia}>
                <h3>{h.dia_da_semana}</h3>
                <label>Horário Inicial</label>
                <select
                  value={h.horario_inicial}
                  onChange={(e) => handleChangeHorario(h.dia_da_semana, "inicial", e.target.value)}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                      {i.toString().padStart(2, "0")}:00
                    </option>
                  ))}
                </select>

                <label>Horário Final</label>
                <select
                  value={h.horario_final}
                  onChange={(e) => handleChangeHorario(h.dia_da_semana, "final", e.target.value)}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                      {i.toString().padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <button className={style.btnSalvar} onClick={salvarHorarios}>
              Salvar Horários
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
