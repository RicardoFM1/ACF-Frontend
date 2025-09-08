import { useEffect, useState } from "react"
import style from "./admin.module.css"
import { apiController } from "../../../controller/api.controller"
import { Link, useNavigate } from "react-router-dom"
import { Iconify } from "../../iconify/iconify"
import { getLocalStorageItem, removeLocalStorageItem, toastbar } from "../../utility/tokenUtility"
import { toast } from "react-toastify"



export const Admin = () => {

    interface iUser {
        id: number,
        email: string,
        admin: boolean
    }

    const [admin, setAdmin] = useState(false)
    const [retrieve, setRetrieve] = useState<iUser|null>()
    const [modalOpen, setModalOpen] = useState(false)
    const [modalAvisoOpen, setModalAvisoOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) { 
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    

    const getRetrieve = async() => {
        try{
            const retrieve = await apiController.get("usuarios/retrieve")
            setRetrieve(retrieve)
         
            if(retrieve.admin === true){
                setAdmin(true)
            }else{
                navigate("/")
        
            }

        }catch(error){
            toastbar.error("Erro ao buscar o usuario")
           
        }
    }
    
    
    
    useEffect(() =>{
        getRetrieve()
        const token = localStorage.getItem("token")
        if(!token){
            navigate("/login")
        }
    }, [])

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
            return <></>
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
    let header = ""
    if(admin && token){
        if(isScrolled){
           header ="header_scrolled"

        }else{
           header = "header_top"
        }
        return <div className={style.load}>
            
    <div className={style.fundoHome}>
        
        <header id="introducao" className={style[header]}>
<div className={style.divLogo}>

             <img src="/images/ImageLogoACF.svg" alt="teste" className={style.imageLogo}/>

            </div>
 <div className={style.btns}> 
    <Link to={"/agendar"} className={style.linkAgendar}>Agendar</Link>
    
    <Link to={"/controle"} className={style.linkControle}>Controle</Link>
    
    {token ?
    <button onClick={() => setModalOpen(true)} className={style.btnSair}>Sair</button>
    :  <Link className={style.linkLogin} to={"/login"}>Fazer login</Link>}
 </div>
        </header>
        {modalOpen && <ModalSair />}
        <div id="amostra" className={style.conteudoPrinHome}>
            <h1 className={style.h1contP}>Agende agora seu campo de futebol!</h1>
            <p>Aqui nesse site você pode agendar um campo de futebol da sua preferência, com direito a: </p>
            <p>Local: Desvende novas localizações de campos de futebol.
                Horário: Escolha seu horário de encontro e reserva do campo.
                Data: Escolha que dia quer agendar o campo.</p>
        </div>
        <h2  id="etapas" className={style.h2}><strong>Alguns de nossos campos</strong></h2>

        <div className={style.imgCamposHome}>
            <img className={style.imgCampos} src="/images/phil-kiel-W1nYkMU-2Jc-unsplash.jpg" alt="" />
            <img className={style.imgCampos} src="/images/imagemCampo2.png" alt="" />
            <img className={style.imgCampos} src="/images/imagemCampo3.png" alt="" />
        </div>

            <div className={style.conteudoSecunHome}>
                <div className={style.txtContSec}>
                    <h1>É simples e fácil</h1>
                    <p><strong>Cadastro</strong></p>
                    <p>Você confirma o dia da semana, dia do mês, mes do ano e local, assim, podemos ter uma consulta mais detalhada sobre a sua reserva.</p>
                    <p>Nós iremos consultar sua reserva e então analisaremos ela, confirmando se temos uma reserva disponivel de acordo com as especificações solicitadas por você!</p>
                    <p>O acordo de pagamento é feito pessoalmente, possibilitando ser efetuado por: Pix, Cartão, Boleto, Fatura e muito mais.</p>
                    <Link to={"/agendar"} className={style.btnTestar}>Testar</Link>
                </div>
                <img className={style.imgCampo} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBDpjc1mRZ9EVUv5Z-kEG47_zceIDukUtWdA&s" alt="" />
            </div>
            <footer className={style.footerHome}>
                <div className={style.footerDiv1}>
                    <h2>ACF</h2>
                    <div className={style.colaboradores}>
                        Colaboradores:
                    <a href="https://instagram.com/ricardofee_">
                    <Iconify icon="skill-icons:instagram" />
                    Ricardo
                    </a>
                    <a href="https://instagram.com/william.k2s13">
                     <Iconify icon="skill-icons:instagram" />
                    William
                    </a>
                    <a href="https://instagram.com/igor_meinhardt">
                     <Iconify icon="skill-icons:instagram" />
                    Igor
                    </a>
                    <a href="https://instagram.com/lucas.rosax">
                     <Iconify icon="skill-icons:instagram" />
                     Lucas
                     </a>
                    </div>
                    <div className={style.saibaMais}>
                        Saiba Mais:
                    <a href="https://github.com/RicardoFM1">
                    <Iconify icon="mdi:github" />
                    Github</a>
                    <a href="https://wa.me/5551984018587?text=Olá,%20tenho%20uma%20dúvida%20sobre%20o%20sistema%20ACF">
                    <Iconify icon="logos:whatsapp-icon" />
                    Whatsapp para contato</a>
                    </div>
                   
                </div>
                <div className={style.footerDiv2}>
                    <div className={style.footerDiv3}>
                        <h4>Paginas</h4>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/agendar"}>Agendar</Link>
                        <Link to={"/cadastro"}>Cadastro</Link>
                        <Link to={"/login"}>Login</Link>
                    </div>
                    <a href="#introducao">Introdução</a>
                    <a href="#amostra">Amostra</a>
                    <a href="#etapas">Etapas</a>
                </div>
            </footer>
        </div>
    </div>
    }
    else{
        const token = getLocalStorageItem("token")
        return <div className={style.load}>
            
        <div className={style.fundoHome}>
        <header id="introducao" className={style.header_top}>
<div className={style.divLogo}>

             <img src="/images/ImageLogoACF.svg" alt="teste" className={style.imageLogo}/>

            </div>
 <div className={style.btns}>
    {token ?
    <Link to={"/agendar"} className={style.linkControle}>Controle</Link>
     : <Link onClick={() => setModalAvisoOpen(true)} to={""} className={style.linkControle}>Controle</Link>
    } 
    <button onClick={() => setModalOpen(true)} className={style.btnSair}>Sair</button>
    
 </div>
        </header>
        {modalAvisoOpen && <ModalAviso />}
        <div  id="amostra" className={style.conteudoPrinHome}>
            <h1 className={style.h1contP}>Agende agora seu campo de futebol!</h1>
            <p>Aqui nesse site você pode agendar um campo de futebol da sua preferência, com direito a: </p>
            <p>Local: Desvende novas localizações de campos de futebol.
                Horário: Escolha seu horário de encontro e reserva do campo.
                Data: Escolha que dia quer agendar o campo.</p>
        </div>
        <h2 id="etapas" className={style.h2}><strong>Alguns de nossos campos</strong></h2>

        <div className={style.imgCamposHome}>
            <img className={style.imgCampos} src="/images/phil-kiel-W1nYkMU-2Jc-unsplash.jpg" alt="" />
            <img className={style.imgCampos} src="/images/imagemCampo2.png" alt="" />
            <img className={style.imgCampos} src="/images/imagemCampo3.png" alt="" />
        </div>

            <div  className={style.conteudoSecunHome}>
                <div className={style.txtContSec}>
                    <h1>É simples e fácil</h1>
                    <p><strong>Cadastro</strong></p>
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
                        <Link to={"/"}>Home</Link>
                        <Link to={"/cadastro"}>Cadastro</Link>
                        <Link to={"/login"}>Login</Link>
                    </div>
                    <a href="#introducao">Introdução</a>
                    <a href="#amostra">Amostra</a>
                    <a href="#etapas">Etapas</a>
                </div>
            </footer>
        </div>
    </div>
     
    }
}