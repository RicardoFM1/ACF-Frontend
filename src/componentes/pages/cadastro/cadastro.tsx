import { Link, useNavigate } from "react-router-dom"
import style from "./cadastro.module.css"
import { useForm } from "react-hook-form"
import type { iCreateUsuario } from "../../../schemas/usuario.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { createLoginSchema } from "../../../schemas/login.schema"
import { apiController } from "../../../controller/api.controller"
import { toast } from "react-toastify"

export const Cadastro=()=>{ 
const navigate = useNavigate()
    const {
register,
handleSubmit,
formState:{
    errors
}
    } = useForm<iCreateUsuario>({
        resolver: zodResolver(createLoginSchema),
        mode: "onBlur"
    })

    const Cadastrar = async (userData: iCreateUsuario) => {
        
            const res = await apiController.post("/usuarios", userData)
            console.log(res)
            if(res){
                toast.success("Cadastro realizado com sucesso! Redirecionando para o login")
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
            }

        
    }
  return  <>
   <header className={style.header}>
    <h1>ACF</h1>
    <div className={style.btnLogin}>
        <Link to={"/login"} className={style.link}>Login</Link>
        </div>
   </header>
   <div className={style.divFundo}>
    <div className={style.Cadastro}>
        <h2>Cadastro</h2>
        
    <form className={style.formulario} onSubmit={handleSubmit(Cadastrar)}>
<div className={style.inputs}>
    

        <label>Email</label>
        <input {...register("email")} type="text" placeholder="digite seu email..." />
        {errors.email&& <span className={style.errorMsg}>{errors.email.message}</span> }
        </div>
        
        <div className={style.inputs}>
        <label>Senha</label>
        <input {...register("password")}type="text" placeholder="digite sua senha..." />
        {errors.password&& <span className={style.errorMsg}>{errors.password.message}</span> }
        </div>
        
        <button type="submit" className={style.btnCadastro}>Cadastrar</button>
    </form>
        </div>

    </div>
  
    </>
}