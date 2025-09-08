import { useState } from "react";
import { apiController } from "../../../controller/api.controller";
import style from "./forgotPassword.module.css";
import { toastbar } from "../../utility/tokenUtility";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiController.post("/auth/forgot-password", { email });
      if(res.status === 200){

          toastbar.success("Link de redefinição enviado por email!");
        }
    

      setEmail("");
    } catch (err: any) {
     
      const errorMsg = err.response?.data?.message;
      toastbar.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.h2Esqueci}>Esqueci minha senha</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <label className={style.labelEmailResetSenha}>Email</label>
        <input 
            className={style.inputEmailResetSenha}
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <button className={style.btnSendLink} type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar link"}
        </button>
      </form>
    </div>
  );
};
