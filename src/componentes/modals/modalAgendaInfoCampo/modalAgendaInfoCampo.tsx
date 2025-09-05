import { useEffect, useState } from "react";
import { apiController } from "../../../controller/api.controller";
import type { iCampos, modalProps } from "../modalsInterface/modalInterface"
import style from "./modalAgendaInfoCampo.module.css"

export const OpenModalInfo = ({isOpen, onClose, campoId}:modalProps) => {
    const [infoCampo, setInfoCampo] = useState<iCampos>({} as iCampos);    

    const getCamposInfo = async () => {
        if (campoId) {
          const campo = await apiController.get(`/campos/${campoId}`);
    
          if (campo) {
            setInfoCampo(campo);
            console.log(campo);
          }
        }
      };   


      useEffect(() => {
        getCamposInfo()
      }, [campoId])

        if(isOpen){
            return <>
            
             <div className={style.fundoModal}> 
            <div className={style.tituloModalInfoCampos}>
                    <h2>Informações do campo</h2>
                    <div className={style.divBtnFecharModal}>
                    <button className={style.btnFecharModal} onClick={onClose}>X</button>
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
                        <h2>Foto do campo</h2>
                        {infoCampo.imagem ? 
                  <img
                    src={`${infoCampo.imagem}`}
                    alt="Imagem do campo"
                    className={style.imagemCampo}
                  />
                  
                :
                <p>Não há nenhuma foto deste campo!</p>
                }
                    </div>
                    
                </div>
                </div>
            </>
        }else{
            return <></>
        }
    }