import { useEffect, useState } from "react";
import style from "./modalControleEditarHorarios.module.css";
import { apiController } from "../../../controller/api.controller";
import { toastbar } from "../../utility/tokenUtility";

interface iHorario {
  dia_da_semana: string;
  horario_inicial: string;
  horario_final: string;
  camposId: number;
}

interface ModalEditarHorariosProps {
  isOpen: boolean;
  onClose: () => void;
  campoId: number | null | undefined;
}

export const ModalEditarHorarios = ({ isOpen, onClose, campoId }: ModalEditarHorariosProps) => {
  const diasSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

  const [horarios, setHorarios] = useState<iHorario[]>([]);

  // Buscar horários atuais do backend
  const getHorarios = async () => {
    if (!campoId) return;
    const novosHorarios: iHorario[] = [];
    for (const dia of diasSemana) {
      const res = await apiController.get(`/horarios/${campoId}/diaSemana=${dia}`);
      if (res) {
        novosHorarios.push({
          dia_da_semana: dia,
          horario_inicial: res.horario_inicial,
          horario_final: res.horario_final,
          camposId: campoId
        });
      } else {
        // caso não exista, criar horário default
        novosHorarios.push({
          dia_da_semana: dia,
          horario_inicial: "00:00",
          horario_final: "00:00",
          camposId: campoId
        });
      }
    }
    setHorarios(novosHorarios);
  };

  useEffect(() => {
    if (isOpen) getHorarios();
  }, [isOpen, campoId]);

  const handleChangeHorario = (dia: string, tipo: "inicial" | "final", value: string) => {
    setHorarios(prev =>
      prev.map(h => (h.dia_da_semana === dia ? { ...h, [`horario_${tipo}`]: value } : h))
    );
  };

  const salvarHorarios = async () => {
    if (!campoId) return;
    try {
      await apiController.patch(`/horarios/${campoId}`, horarios);
      toastbar.success("Horários atualizados com sucesso!");
      onClose();
    } catch (error: any) {
      toastbar.error(error.response?.data?.message || "Erro ao atualizar horários");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={style.fundoModal}>
      <div className={style.editarHorarios}>
        <div className={style.headerEditarCampos}>
          <h2>Editar Horários</h2>
          <button className={style.btnFecharModal} onClick={onClose}>X</button>
        </div>
        <div className={style.bodyEditarHorarios}>
          {horarios.map((h) => (
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
  );
};
