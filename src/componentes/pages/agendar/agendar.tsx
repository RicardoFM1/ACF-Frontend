import { Link, useNavigate } from "react-router-dom"
import style from "./agendar.module.css"
import { useEffect, useState } from "react"
import { apiController } from "../../../controller/api.controller"
import {} from "../../images/imageCampoFutebol.png"
import { Iconify } from "../../iconify/iconify"


export const Agendar=()=>{
    const navigate = useNavigate()

    interface iCampos {
    id: number,
    nome: string,
    endereco: string,
    descricao: string,
    valor: number,
    imagem: string,
    }

   
    const [campos, setCampos] = useState([] as iCampos[])
    const [modalCamposOpen, setModalCamposOpen] = useState(false)
    const [modalInfoOpen, setModalInfoOpen] = useState(false)
    const [campoId, setCampoId] = useState<number | null>()
    const [infoCampo, setInfoCampo] = useState<iCampos>({} as iCampos)
    const [modalAvisoOpen, setModalAvisoOpen] = useState(false)

    const getCampos = async() => {
        const campos = await apiController.get("/campos")
        setCampos(campos)
    }
 
    const getCamposInfo = async() => {
        if(campoId){
            const campo = await apiController.get(`/campos/${campoId}`)
            
            if(campo){
                setInfoCampo(campo)
                console.log(campo)
            }
           
            
        }

    }
    const clickInformacoes = (id:number) => {
        setModalInfoOpen(true)
        setCampoId(id)
    }

    useEffect(() => {
        console.log(campoId)
        getCamposInfo()
    }, [campoId])

   
        
    useEffect(() =>{
    getCampos()
    const token = localStorage.getItem("token")
    if(!token){
        navigate("/login")
    }
    }, [])

    useEffect(() => {
        getCampos()
    }, [campos])
     useEffect(() => {
        console.log(infoCampo)
    }, [infoCampo])

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
                {campos.map((campos:iCampos) => (
                    
                    <div key={campos.id} className={style.fundoCampo}>
                    <div className={style.divNomeCampo}>
                        <p><strong>{campos.nome}</strong></p>
                    </div>
                    <div className={style.ladoDireitoCampos}>
                    <div className={style.divPrecoCampo}>
                        <p><strong>R${campos.valor}</strong> </p>
                    </div>
                    <div className={style.divBtnInformacoes}>
                        <button onClick={() => clickInformacoes(campos.id)}  className={style.maisInformacoes}>Mais informações</button>
                    </div>
                    </div>
                </div>
            ))}
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
        <div className={style.fundoModal}>
            <div className={style.modalAviso}>
                <div className={style.divIconAlerta}>
                <Iconify icon="mingcute:alert-fill"
                color="#A02525"
                height={58}
                width={58}
                className={style.iconAlerta}
                />
                </div>
                <h2>AVISO!</h2>
                <p>Não há nenhum campo registrado ainda.</p>
                <div className={style.divBtnModal}>
                   
                    <button className={style.btnOk} onClick={() => setModalAvisoOpen(false)}>Ok</button>
                   
                </div>
            </div>

        </div>
        </>
            
        }else{
            return null
        }
    }

    const OpenModalInfo = () => {
        
       
        if(modalInfoOpen){
            return <>
            
             <div className={style.fundoModal}> 
            <div className={style.tituloModalInfoCampos}>
                    <h2>Informações do campo</h2>
                    <div className={style.divBtnFecharModal}>
                    <button className={style.btnFecharModal} onClick={() => setModalInfoOpen(false)}>X</button>
                    </div>
                </div>
                <div className={style.modalInfo}>
                    <div className={style.infoEsquerda}>
                    <div className={style.divEnderecoCampo}>
                    <h2>Endereço</h2>
                    <p className={style.enderecoCampo}>{infoCampo.endereco}</p>
                    </div>
                    <div className={style.divDescricaoCampo}>
                        <h2>Descrição</h2>
                        <p className={style.descricaoCampo}>{infoCampo.descricao}</p>
                    </div>
                    <div className={style.contatoCampo}>
                        <p>Caso não tenha encontrado uma informação que deseja aqui,
                            entre em contato conosco
                        </p>
                    </div>
                    </div>
                    <div className={style.divImagensCampo}>
                        <h2>Fotos do campo</h2>
                        <img src="src/componentes/images/imageCampoFutebol.png" alt="imagem do campo"/>
                        <img src="src/componentes/images/imageCampoFutebol.png" alt={infoCampo.imagem} />
                    </div>
                    
                </div>
                </div>
            </>
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
    {modalInfoOpen && <OpenModalInfo />}
    {modalAvisoOpen && <ModalAviso />}
    <h2 className={style.h2Agendamento}>Agende seu campo de futebol</h2>

    <div className={style.divPrincipalAgendamento}>
        <div className={style.divOne}> 
        <div className={style.divEscolhaCampo}>
      <h3>Escolha o campo disponivel</h3>
        <button onClick={() => campos.length >= 1 ? setModalCamposOpen(true) : setModalAvisoOpen(true) } 
        className={style.btnEscolhaDoCampo}>Escolha um campo</button>
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