<<<<<<< HEAD
import { Link } from "react-router-dom"
import style from "./login.module.css"

export const Login=()=>{ 

  return  <>
   <header className={style.header}>
    <h1>ACF</h1>
    <div className={style.btnCadastro}>
       <Link to={"/cadastro"} className={style.link}>Cadastro</Link> 
        </div>
   </header>
   <div className={style.divFundo}>
    <div className={style.Login}>
        <h2>Login</h2>
        <div className={style.formulario}>
<div className={style.inputs}>
        <p>Email</p>
        <input type="text" placeholder="digite seu email..." />
        </div>
        <div className={style.inputs}>
        <p>Senha</p>
        <input type="text" placeholder="digite sua senha..." />
        </div>
        </div>
        
        <button className={style.butnLogin}>Fazer login</button>

    </div>
   </div>
    </>
}
=======
import { Link, useNavigate } from "react-router-dom";
import style from "./login.module.css";
import { useForm } from "react-hook-form";
import {
  createLoginSchema,
  type iCreateLogin,
} from "../../../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiController } from "../../../controller/api.controller";
import { getLocalStorageItem, setLocalStorageToken, toastbar } from "../../utility/tokenUtility";

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
     if (res) {
       toastbar.success("Login realizado com sucesso!");
       setLocalStorageToken(res.token)
       
       const token = getLocalStorageItem("token")
       if(token){
         const retrieve = await apiController.get("usuarios/retrieve")
         if(retrieve.admin === true){
           setTimeout(() => {
             navigate("/admin");
            }, 3000);
          }
          else{
            setTimeout(() => {
              navigate("/");
            }, 3000);
          }
        } 
      }
    }catch(error:any){
        console.log(error, "erro")
        toastbar.error(error.response.data.message)
      }
  }
  return  <>
      <header className={style.header}>
        <h1>ACF</h1>
      <div className={style.divLinks}>
        <Link to={"/"} className={style.link}>
            Voltar à página inicial
          </Link>
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
                  {errors.email && errors.email && (
              <span className={style.errorMsg}>
                {errors.email?.message}
              </span>
            )}
                </div>
                
                <div className={style.inputs}>
                  <label>Senha</label>
                  <input {...register("password")}type="text" placeholder="digite sua senha..." />
                  {errors.password && errors.password && (
              <span className={style.errorMsg}>
                {errors.password?.message}
              </span>
            )}
                </div>
                
            <button type="submit" className={style.btnLogin}>Fazer login</button>
        </form>
              </div>
        </div>
      
    </>
  
};

>>>>>>> Ricardo
