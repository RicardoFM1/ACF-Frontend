import { useState } from "react";
import { apiController } from "../../../controller/api.controller";
import style from "./forgotPassword.module.css";
import { toastbar } from "../../utility/tokenUtility";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await apiController.post("/auth/forgot-password", { email });
      toastbar.success(res.message);
    } catch (err: any) {
      toastbar.error(err.response?.data?.message || "Erro ao enviar email");
    }
  };

  return (
    <div className={style.container}>
      <h2>Esqueci minha senha</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar link</button>
      </form>
    </div>
  );
};
