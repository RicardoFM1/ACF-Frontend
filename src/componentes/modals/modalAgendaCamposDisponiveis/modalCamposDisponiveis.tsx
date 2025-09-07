import { useEffect, useState } from "react";
import type {
  iCampos,
  iUser,
  modalProps,
} from "../modalsInterface/modalInterface";
import style from "./modalCamposDisponiveis.module.css";
import { apiController } from "../../../controller/api.controller";
import { OpenModalInfo } from "../modalAgendaInfoCampo/modalAgendaInfoCampo";

export const OpenModalCampos = ({
  isOpen,
  onClose,
  onSelectCampo,
}: modalProps) => {
  const [searchCampo, setSearchCampo] = useState("");
  const [campos, setCampos] = useState([] as iCampos[]);
  const [retrieve, setRetrieve] = useState<iUser | null>();
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [campoId, setCampoId] = useState<number | null>(null);
  const [infoCampo, setInfoCampo] = useState<iCampos>({} as iCampos);
  const [optionChecked, setOptionChecked] = useState("")

  const getRetrieve = async () => {
    const retrieve = await apiController.get("/usuarios/retrieve");
    console.log(retrieve, "retrive");
    setRetrieve(retrieve);
    await getCampos(retrieve);
  };

  const getCampos = async (retrieve: any) => {
    if (retrieve?.admin === true) {
      const campos = await apiController.get("/campos");
      setCampos(campos.data);
    } else {
      const campos = await apiController.get("/campos?status=ativo");
      setCampos(campos.data);
    }
  };

  const getCamposInfo = async () => {
    if (campoId) {
      const campo = await apiController.get(`/campos/${campoId}`);

      if (campo) {
        setInfoCampo(campo);
        console.log(campo);
      }
    }
  };
  const clickInformacoes = (id: number) => {
    setModalInfoOpen(true);
    setCampoId(id);
  };

  const clickSelecionar = (campo: iCampos) => {
    if (onSelectCampo) {
      onSelectCampo(campo.id, campo);
    }
    setCampoId(campo.id);
    if(onClose){   
        onClose()
    }
  };

  useEffect(() => {
    getRetrieve();
    setOptionChecked("nome")
  }, []);

  useEffect(() => {
    console.log(campoId);
    getCamposInfo();
  }, [campoId]);

  if (isOpen) {
    return (
      <>
      {modalInfoOpen && <OpenModalInfo
      isOpen={modalInfoOpen} 
      campoId={campoId} 
      onClose={() => setModalInfoOpen(false)}
       
       />}
        <div className={style.fundoModal}>
          <div className={style.tituloModalCampos}>
            <h2>Campos disponíveis</h2>
            <div className={style.divBtnFecharModal}>
              <button className={style.btnFecharModal} onClick={onClose}>
                X
              </button>
            </div>
          </div>
          <div className={style.modal}>
            <div className={style.divPesquisa}>
          
              {optionChecked === "nome" || optionChecked==='' ?
               <input
                id="idPesquisaCampo"
                value={searchCampo}
                onChange={(e) => setSearchCampo(e.target.value)}
                className={style.inputSearch}
                type="search"
                placeholder="Pesquise um campo (por nome)"
               

              />
            : <input
                id="idPesquisaCampo"
                value={searchCampo}
                onChange={(e) => setSearchCampo(e.target.value)}
                className={style.inputSearch}
                type="search"
                placeholder="Pesquise um campo (por preço)"
               

              />
            }
             
              <div className={style.divFiltro}>
                <p>Filtrar</p>
            
                <select
                  className={style.selectFiltro}
                  name="filtroCampoName"
                  id="filtroCampo"
                  onChange={(e) => setOptionChecked(e.target.value)}
                >
                  <option value="nome">Nome</option>
                  <option value="preco">Preço</option>
                </select>
              </div>
            </div>
            {campos
              .filter((campo) =>{
                if(optionChecked === "nome"){
                  return campo.nome.toLowerCase().includes(searchCampo.toLowerCase())

                }else{
                   return String(campo.valor).includes(searchCampo)
                }
              }
                
              )
              .map((campo: iCampos) => (
                <div key={campo.id} className={style.fundoCampo}>
                  <div className={style.divCimaModal}>
                    <div className={style.divNomeCampo}>
                        <div className={style.tooltip}>
                      <p title={campo.nome}>
                        <strong>{campo.nome}</strong>
                      </p>
                      <span className={style.tooltiptext}>{campo.nome}</span>
                      </div>
                      
                    </div>
                    <div className={style.divPrecoCampo}>
                      <p title={"R$" + String(campo.valor / 100)}>
                        <strong>R${campo.valor / 100}</strong>
                      </p>
                    </div>
                  </div>
                  <div className={style.divBtnsModalCampo}>
                    <button
                      onClick={() => clickSelecionar(campo)}
                      className={style.selecionar}
                    >
                      Selecionar
                    </button>
                    <button
                      onClick={() => clickInformacoes(campo.id)}
                      className={style.maisInformacoes}
                    >
                      Mais informações
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
