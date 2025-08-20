import { Link, useNavigate } from "react-router-dom"
import style from "./agendar.module.css"
import { useEffect, useState } from "react"



export const Agendar=()=>{
    const navigate = useNavigate()
    const [modalCamposOpen, setModalCamposOpen] = useState(false)

   

    useEffect(() =>{
    const token = localStorage.getItem("token")
    if(!token){
        navigate("/login")
    }
    }, [])

     const OpenModalCampos = () => {
        if(modalCamposOpen){
            return <>
            <div className={style.fundoModal}> 
                <div className={style.tituloModalCampos}>
                    <h2>Campos disponíveis</h2>
                    <div className={style.divBtnFecharModal}>
                    <button className={style.btnFecharModal} onClick={() => setModalCamposOpen(false)}>X</button>
                    </div>
                </div>
                <div className={style.modal}>
                <div className={style.divPesquisa}>
                <input className={style.inputSearch} type="search" placeholder="Pesquise um campo" />
                <button className={style.btnPesquisar}>Pesquisar</button>
                </div>
                <div className={style.fundoCampo}>
                    <div className={style.divNomeCampo}>
                        <p><strong>Nome</strong></p>
                    </div>
                    <div className={style.ladoDireitoCampos}>
                    <div className={style.divPrecoCampo}>
                        <p><strong>R$189,90</strong> </p>
                    </div>
                    <div className={style.divBtnInformacoes}>
                        <button className={style.maisInformacoes}>Mais informações</button>
                    </div>
                    </div>
                </div>
                </div>

            </div>
            </>
        }else{
            return <></>
        }

    }

   return  <div className={style.load}>
    <header className={style.headerAgendar}>
    <div className={style.divBtnVoltar}>
        
<Link to={"/"} className={style.btnVoltar}>Voltar</Link>


        </div>
            <h1 className={style.h1Agendar}>Agendamentos</h1>
    </header>

    {modalCamposOpen && <OpenModalCampos />}

    <h2 className={style.h2Agendamento}>Agende seu campo de futebol</h2>

    <div className={style.divPrincipalAgendamento}>
        <div className={style.divOne}> 
        <div className={style.divEscolhaCampo}>
      <h3>Escolha o campo disponivel</h3>
        <button onClick={() => setModalCamposOpen(true)} className={style.btnEscolhaDoCampo}>Escolha um campo</button>
        </div>
        <div className={style.divEscolhaHorario}>
            <h3>Escolha o horario disponivel</h3>
            <select className={style.selectInput} name="" id=""><option value="">Horario</option></select>
        </div>
        <div className={style.divVisualizar}>
            <h3>Ver meus Agendamentos</h3>
            <button className={style.btnVisualizar}>Visualizar</button>
        </div>
</div>
            <div className={style.divEscolhaData}>
            <h3>Escolha a data do agendamento</h3>
            <input type="date" className={style.inputAgendar}/>
            </div>
    
    </div>
    </div>



    
}