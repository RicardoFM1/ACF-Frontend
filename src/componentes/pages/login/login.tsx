import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import { useForm } from "react-hook-form";
import {
  createLoginSchema,
  type iCreateLogin,
} from "../../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiController } from "../../../controller/api.controller";
import { toast } from "react-toastify";

export const Login = () => {
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iCreateLogin>({
    resolver: zodResolver(createLoginSchema),
    mode: "onBlur"
  });

  const fazerLogin = async (loginData: iCreateLogin) => {
    
    try {
      const res = await apiController.post("/login", loginData);
      console.log(res, "res do axios");
      if (res.data.token) {
        toast.success("Login realizado com sucesso!");
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error: any) {
      console.log(error, "error");
      toast.error(error.response.data.message);
    }
  };
  return  <>
      <header className={style.header}>
        <h1>ACF</h1>

        <div className={style.btnCadastro}>
          <Link to={"/cadastro"} className={style.link}>
            Cadastro
          </Link>
        </div>
      </header>
      
          <div className={style.divFundo}>
            <div className={style.Login}>
              <h2>Login</h2>
              
        <form className={style.formulario} onSubmit={handleSubmit(fazerLogin)}>
                <div className={style.inputs}>
                  <label>Email</label>
                  <input {...register("email")} type="text" placeholder="digite seu email..." />
                </div>
                {errors.email && errors.email && (
              <span className={style.errorMsg}>
                {errors.email?.message}
              </span>
            )}
                <div className={style.inputs}>
                  <label>Senha</label>
                  <input {...register("password")}type="text" placeholder="digite sua senha..." />
                </div>
                {errors.password && errors.password && (
              <span className={style.errorMsg}>
                {errors.password?.message}
              </span>
            )}
            <button type="submit" className={style.butnLogin}>Fazer login</button>
        </form>
              </div>
        </div>
      
    </>
  
};

