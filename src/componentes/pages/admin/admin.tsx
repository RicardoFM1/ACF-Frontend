import { useEffect, useState } from "react"
import style from "./admin.module.css"
import { apiController } from "../../../controller/api.controller"
import { Link } from "react-router-dom"



export const Admin = () => {

    interface iUser {
        id: number,
        email: string,
        admin: boolean
    }

    const [admin, setAdmin] = useState(false)
    const [retrieve, setRetrieve] = useState<iUser|null>()
    
    const getRetrieve = async() => {
        try{
            const retrieve = await apiController.get("usuarios/retrieve")
            setRetrieve(retrieve)
            if(retrieve.admin === true){
                setAdmin(true)
            }else{
                setAdmin(false)
            }

        }catch(error){
            console.log("Erro ao buscar o usuario:", error)
        }
    }
    
    
    useEffect(() =>{
        getRetrieve()
    }, [])

      useEffect(() => {
    console.log("retrieve atualizado:", retrieve)
  }, [retrieve])

  useEffect(() => {
    console.log("admin atualizado:", admin)
  }, [admin])
    
    if(admin){

        return <>
    <div className={style.fundoHome}>
        <header className={style.header}>
 <h1>ACF</h1>
 {/* <div className={style.btns}> 
    <Link to={"/agendar"} className={style.linkCadastro}>Controle</Link>
    
 </div> */}
        </header>

        <div className={style.conteudoPrinHome}>
            <h1 className={style.h1contP}>Agende agora seu campo de futebol!</h1>
            <p>Aqui nesse site você pode agendar um campo de futebol da sua preferência, com direito a: </p>
            <p>Local: Desvende novas localizações de campos de futebol.
                Horário: Escolha seu horário de encontro e reserva do campo.
                Data: Escolha que dia quer agendar o campo.</p>
        </div>
        <h2 className={style.h2}><strong>Alguns de nossos campos</strong></h2>

        <div className={style.imgCamposHome}>
            <img className={style.imgCampos} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfzVnThmA-6QW9n7BkUJLfxJfgL7hjJ4JGQw&s" alt="" />
            <img className={style.imgCampos} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-5iO45ewltlVapzHDel3UGNBg6o8GJCAeXg&s" alt="" />
            <img className={style.imgCampos} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQav3Wte1eoThXMuXr-RHEaXE1c4sX2alGFTg&s" alt="" />
        </div>

            <div className={style.conteudoSecunHome}>
                <div className={style.txtContSec}>
                    <h1>É simples e fácil</h1>
                    <p><strong>cadastro</strong></p>
                    <p>Você confirma o dia da semana, dia do mês, mes do ano e local, assim, podemos ter uma consulta mais detalhada sobre a sua reserva.</p>
                    <p>Nós iremos consultar sua reserva e então analisaremos ela, confirmando se temos uma reserva disponivel de acordo com as especificações solicitadas por você!</p>
                    <p>O acordo de pagamento é feito pessoalmente, possibilitando ser efetuado por: Pix, Cartão, Boleto, Fatura e muito mais.</p>
                </div>
                <img className={style.imgCampo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDpjc1mRZ9EVUv5Z-kEG47_zceIDukUtWdA&s" alt="" />
            </div>
            <footer className={style.footerHome}>
                <div className={style.footerDiv1}>
                    <h2>ACF</h2>
                </div>
                <div className={style.footerDiv2}>
                    <div className={style.footerDiv3}>
                        <h4>Paginas</h4>
                        <p>Home</p>
                        <p>Agenda</p>
                        <p>Cadastro</p>
                        <p>Login</p>
                    </div>
                    <h4>Introdução</h4>
                    <h4>Amostra</h4>
                    <h4>Etapas</h4>
                </div>
            </footer>
        </div>
    </>
    }
    else{
        return <>
        <h1>Seu níveis de acesso não lhe permitem acessar esta página!</h1>
        </>
    }
}