import { Link, useNavigate } from "react-router-dom"
import style from "./cadastro.module.css"
import { useForm } from "react-hook-form"
import { createUsuarioSchema, type iCreateUsuario } from "../../../schemas/usuario.schema"
import { zodResolver } from "@hookform/resolvers/zod"
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
        resolver: zodResolver(createUsuarioSchema),
        mode: "onBlur"
    })

    const Cadastrar = async (userData: iCreateUsuario) => {
        try{

            const res = await apiController.post("/usuarios", userData)
            console.log(res)
            if(res){
                toast.success("Cadastro realizado com sucesso! Redirecionando para o login")
                setTimeout(() => {
                    navigate("/login")
                }, 3000);
            }
        }catch(error:any){
        console.log(error, "erro")
        toast.error(error.response.data.message)
      }
            
        
    }
  return  <div className={style.load}>
    
   <header className={style.header}>
    <h1>ACF</h1>
    <div className={style.divLinks}>
        <Link to={"/"} className={style.link}>
            Voltar à página inicial
          </Link>
        <Link to={"/login"} className={style.link}>Login</Link>

        </div>
        
   </header>
   <div className={style.divFundo}>
    <div className={style.Cadastro}>
        <h2>Cadastro</h2>
        
    <form className={style.formulario} onSubmit={handleSubmit(Cadastrar)}>
<div className={style.inputs}>
    

        <label>Email</label>
        <input {...register("email")} type="text" placeholder="digite um email..." />
        {errors.email&& <span className={style.errorMsg}>{errors.email.message}</span> }
        </div>
        
        <div className={style.inputs}>
        <label>Senha</label>
        <input {...register("password")}type="text" placeholder="digite uma senha..." />
        </div>
        {errors.password && <span className={style.errorMsg}>{errors.password.message}</span> }
        
        <button type="submit" className={style.btnCadastro}>Cadastrar</button>
    </form>
        </div>

    </div>
  
    </div>
}