import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiController } from "../../../controller/api.controller";
import { toastbar } from "../../utility/tokenUtility";
import style from "./resetPassword.module.css";

export const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [novaSenha, setNovaSenha] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return toastbar.error("Token inválido");

    try {
      await apiController.post("/auth/reset-password", {
        token,
        novaSenha,
      });
      toastbar.success("Senha redefinida com sucesso!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      toastbar.error(err.response?.data?.message || "Erro ao redefinir senha");
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.h2Redefinir}>Redefinir senha</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <label className={style.labelEmailResetSenha}>Nova senha</label>
        <input
        className={style.inputEmailResetSenha}
          type="password"
          placeholder="Digite a nova senha..."
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />
        <button className={style.btnResetSenha} type="submit">Redefinir</button>
      </form>
    </div>
  );
};
