
import { Link, useNavigate } from "react-router-dom"
import style from "./home.module.css"
import { useState } from "react"
import { toast } from "react-toastify"
import { Iconify } from "../../iconify/iconify"
import { getLocalStorageItem, removeLocalStorageItem } from "../../utility/tokenUtility"

export const Home=()=>{ 
    const [modalOpen, setModalOpen] = useState(false)
    const [modalAvisoOpen, setModalAvisoOpen] = useState(false)
    const navigate = useNavigate()

    const logout = () => {
            removeLocalStorageItem("token")
            toast.success("Conta deslogada com sucesso!")
            setTimeout(() =>{
                navigate("/login")
            }, 2000)
            setModalOpen(false)
        }
    

    const ModalSair = () => {
        if(modalOpen){
    return <>
        <div className={style.divModalFundo}>
            <div className={style.Modal}>
                <div className={style.divIconAlerta}>
                <Iconify icon="mingcute:alert-fill"
                color="#A02525"
                height={58}
                width={58}
                className={style.iconAlerta}
                />
                </div>
                <h2>Tem certeza que deseja sair?</h2>
                <p>Essa ação vai fazer com que sua conta seja deslogada.</p>
                <div className={style.divBtnModal}>
                   
                    <button className={style.btnNao} onClick={() => setModalOpen(false)}>Não</button>
                    <button className={style.btnSim} onClick={logout}>Sim</button>
                   
                </div>
            </div>

        </div>
        </>
            
        }else{
            return null
        }
    }



const ModalAviso = () => {
        if(modalAvisoOpen){
    return <>
        <div className={style.divModalFundo}>
            <div className={style.Modal}>
                <div className={style.divIconAlerta}>
                <Iconify icon="mingcute:alert-fill"
                color="#A02525"
                height={58}
                width={58}
                className={style.iconAlerta}
                />
                </div>
                <h2>AVISO!</h2>
                <p>Para acessar esse recurso é necessário fazer login</p>
                <div className={style.divBtnModal}>
                   
                    <button className={style.btnFazerLoginModal} onClick={() => navigate("/login")}>Fazer login</button>
                    <button className={style.btnOk} onClick={() => setModalAvisoOpen(false)}>Ok</button>
                   
                </div>
            </div>

        </div>
        </>
            
        }else{
            return null
        }
    }




    
    const token = getLocalStorageItem("token")
    if(token){

        return  <div className={style.load}>
  <div className={style.fundoHome}>
        <header className={style.header}>
 <h1>ACF</h1>
 <div className={style.btns}> 
    <Link viewTransition to={"/agendar"} className={style.linkCadastro}>Agendar</Link>
    <button onClick={() => setModalOpen(true)} className={style.btnSair}>Sair</button>
 </div>
        </header>
        {modalOpen && <ModalSair />}
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
                    <h4>introdução</h4>
                    <h4>Amostra</h4>
                    <h4>Etapas</h4>
                </div>
            </footer>
        </div>
    </div>
}else{
     const token = getLocalStorageItem("token")
        
    return  <div className={style.load}>
  <div className={style.fundoHome}>
        <header className={style.header}>
 <h1>ACF</h1>
 <div className={style.btns}>
   {token ?
 <Link to={"/agendar"} className={style.linkCadastro}>Agendar</Link>
:  <Link onClick={() => setModalAvisoOpen(true)} to={""} className={style.linkCadastro}>Agendar</Link>
}

    <Link to={"/cadastro"} className={style.linkCadastro}>Cadastro</Link> 
    <Link to={"/login"} className={style.linkLogin}>Login</Link>
 </div>
        </header>
        {modalAvisoOpen && <ModalAviso />}
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
                    <h4>introdução</h4>
                    <h4>Amostra</h4>
                    <h4>Etapas</h4>
                </div>
            </footer>
        </div>
    </div>
}
}