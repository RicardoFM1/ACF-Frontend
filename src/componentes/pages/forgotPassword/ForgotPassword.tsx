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
        const message = res.data?.message || "Link de redefinição enviado por email!";
        toastbar.success(message);
    

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
      <h2>Esqueci minha senha</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Enviar link"}
        </button>
      </form>
    </div>
  );
};
