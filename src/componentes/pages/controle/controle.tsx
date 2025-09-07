import { Link } from "react-router-dom";
import style from "./controle.module.css";
import { Iconify } from "../../iconify/iconify";
import { useEffect, useState } from "react";
import { apiController } from "../../../controller/api.controller";
import {
  atualizarInfoCampoSchema,
  type iAtualizarCampos,
} from "../../../schemas/campo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toastbar } from "../../utility/tokenUtility";
import { OpenModalEditarCampo } from "../../modals/modalControleEditarCampo/modalControleEditarCampo";
import { ModalEditarHorarios } from "../../modals/modalControleEditarHorarios/modalControleEditarHorarios";
import { OpenModalAddCampo } from "../../modals/modalControleAddCampo/modalControleAddCampo";
import { OpenModalAgendamentos } from "../../modals/modalControleGerenciarAgendamentos/modalControleGerenciarAgendamentos";

export const Controle = () => {
  interface iCampos {
    id: number;
    nome: string;
    endereco: string;
    descricao: string;
    valor: number;
    imagem: string;
    status: "ativo" | "inativo";
  }

  const [campos, setCampos] = useState([] as iCampos[]);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [campoId, setCampoId] = useState<number | null>(null);
  const [infoCampo, setInfoCampo] = useState<iCampos>({} as iCampos);
  const [isEditingEndereco, setIsEditingEndereco] = useState(false);
  const [isEditingDescricao, setIsEditingDescricao] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isOpenEditarCampo, setIsOpenEditarCampo] = useState(false);
  const [isOpenEditarHorarios, setIsOpenEditarHorarios] = useState(false);
  const [isOpenAddCampo, setIsOpenAddCampo] = useState(false);
  const [status, setStatus] = useState("")
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0);
  const [buttonVoltarDisabled, setButtonVoltarDisabled] = useState(false)
  const [search, setSearch] = useState("")
  const [optionChecked, setOptionChecked] = useState("")
  const [isOpenAgendamentos, setIsOpenAgendamentos] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<iAtualizarCampos>({
    resolver: zodResolver(atualizarInfoCampoSchema),
    mode: "onBlur",
    defaultValues: {
      descricao: "",
      endereco: "",
    },
  });

  const getCampos = async () => {
    const campos = await apiController.get(`/campos?offset=${offset}&limit=5`);
    setCampos(campos.data);
    setStatus(campos.status)
    setTotal(campos.total);
  };

  const atualizarStatus = async(campoData:iCampos) => {
    
    if(status === "ativo"){
      setStatus("inativo")
      campoData.status = "inativo"
    }else{
      setStatus("ativo")
         campoData.status = "ativo"
    }
    console.log(status)
    try{

      const res = await apiController.patch(`/campos/${campoData.id}`, {status})
      if(res){
        if(status === "ativo")
        toastbar.success("Campo ativado com sucesso!")
      else{
        toastbar.success("Campo desativado com sucesso!") 
      }
      }
     
    }catch(error:any){
      console.log(error.response.data.message)
      toastbar.error("Erro ao desativar o campo!")
    }
  }

  const getCampoInfo = async () => {
    if (campoId) {
      const campo = await apiController.get(`/campos/${campoId}`);
      if (campo) {
        setInfoCampo(campo);
      }
    }
  };

  useEffect(() => {
    getCampos();
    setOptionChecked("")
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

  useEffect(() => {
    getCampos();
  }, [offset]);

  useEffect(() => {
    if (campoId) getCampoInfo();
    console.log(campoId);
  }, [campoId]);

  const clickInformacoes = async (id: number) => {
    setCampoId(id);
    const campo = await apiController.get(`/campos/${id}`);
    if (campo) {
      setInfoCampo(campo);
      setModalInfoOpen(true);
      setIsEditingDescricao(false);
      setIsEditingEndereco(false);
      setIsEditingImage(false)
    }
  };




  const atualizarCampo = async (campoData: iAtualizarCampos) => {
    console.log(campoData, "cmData");
    try {
      const res = await apiController.patch(`/campos/${campoId}`, campoData);
      console.log(res, "res");
      if (res) {
        toastbar.success("Campo atualizado com sucesso!");
        await getCampos();
        setModalInfoOpen(false)
      
      }
    } catch (error: any) {
      console.log(error);
      toastbar.error(
        error.response?.data?.message || "Erro ao atualizar campo"
      );
    }
    console.log("chamado");
  
  };

  const clickEditarPencil = async (id: number) => {
    setCampoId(id);
    const campo = await apiController.get(`/campos/${id}`);
    if (campo) {
      setInfoCampo(campo);
      setIsOpenEditarCampo(true);
    }
  };

  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setValue("imagem", base64); 
        setPreview(base64); 
      };
      reader.readAsDataURL(file);
    }
  };

 const paginacaoUp = () => {
   if (offset + 5 < total) {
  setOffset((offset + 5) )
  setButtonVoltarDisabled(false)

   }
 }

  const paginacaoDown = () => {
    if(offset > 0){
      setOffset(Math.max(offset - 5, 0))
    }else{
      setButtonVoltarDisabled(true)
     
    }
  }

  interface ModalInfoProps {
    isOpen: boolean;
    infoCampo: iCampos;
    onClose: () => void;
    atualizarCampo: (data: iAtualizarCampos) => Promise<void>;
    isEditingEndereco: boolean;
    setIsEditingEndereco: (v: boolean) => void;
    isEditingDescricao: boolean;
    setIsEditingDescricao: (v: boolean) => void;
    register: any;
    handleSubmit: any;
    errors: any;
    setValue: any;
  }

  const ModalInfo = ({
    isOpen,
    infoCampo,
    onClose,
    atualizarCampo,
    isEditingEndereco,
    setIsEditingEndereco,
    isEditingDescricao,
    setIsEditingDescricao,
    register,
    handleSubmit,
    errors,
    setValue,
  }: ModalInfoProps) => {
    useEffect(() => {
      if (infoCampo) {
        setValue("endereco", infoCampo.endereco);
        setValue("descricao", infoCampo.descricao);
      }
    }, [infoCampo, setValue]);

    if (!isOpen) return null;

    return <div className={style.load}>
      
      <div className={style.fundoModal}>
        <div className={style.tituloModalInfoCampos}>
          <h2>Informações do campo</h2>
          <div className={style.divBtnFecharModal}>
            <button
              type="button"
              className={style.btnFecharModal}
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>
        <div className={style.modalInfo}>
          <form
            className={style.formCampo}
            onSubmit={handleSubmit(atualizarCampo)}
          >
            <div className={style.infoEsquerda}>
              <div className={style.divEnderecoCampo}>
                <h2>Endereço</h2>
                <div className={style.caixaEndereco}>
                  {isEditingEndereco ? (
                    <textarea maxLength={255} {...register("endereco")} rows={6} cols={50} />
                  ) : (
                    <p className={style.enderecoCampo}>{infoCampo.endereco}</p>
                  )}
                  <div className={style.divIcon}>
                    <button className={style.btnEditarPencil} type="button">
                      <Iconify
                        onClick={() => setIsEditingEndereco(!isEditingEndereco)}
                        height={24}
                        width={24}
                        className={style.iconLapis}
                        icon="raphael:pensil"
                      />
                    </button>
                  </div>
                  {errors.endereco && (
                    <p className={style.errorMsg}>{errors.endereco.message}</p>
                  )}
                </div>
              </div>

              <div className={style.divDescricaoCampo}>
                <h2>Descrição</h2>
                <div className={style.caixaDescricao}>
                  {isEditingDescricao ? (
                    <textarea maxLength={255} {...register("descricao")} rows={6} cols={50} />
                  ) : (
                    <p className={style.descricaoCampo}>
                      {infoCampo.descricao}
                    </p>
                  )}
                  <div className={style.divIcon}>
                    <button className={style.btnEditarPencil} type="button">
                      <Iconify
                        onClick={() =>
                          setIsEditingDescricao(!isEditingDescricao)
                        }
                        height={24}
                        width={24}
                        className={style.iconLapis}
                        icon="raphael:pensil"
                      />
                    </button>
                  </div>
                  {errors.descricao && (
                    <p className={style.errorMsg}>{errors.descricao.message}</p>
                  )}
                </div>
              </div>

              
            </div>

            <div className={style.divImagensCampo}>
              <h2>Foto do campo</h2>
              <div className={style.caixaFoto1}>
                {isEditingImage ? 
              
                <>
                <div className={style.divImage}>
                <label className={style.labelImage} htmlFor="inputImage">Escolher uma imagem</label>
                <input
                {...register("imagem")}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={style.inputImage}
                    id="inputImage" />
                    
                    {preview && (
                <img
                  src={preview}
                  alt="Pré-visualização"
                  style={{ marginTop: "10px", maxHeight: "120px" }}
                />
                
              )}
              </div>
              </>

              : 
              infoCampo.imagem ? 
                  <img
                    src={`${infoCampo.imagem}`}
                    alt="Imagem do campo"
                    className={style.imagemCampo}
                  />
                  
                :
                <p>Não há nenhuma foto deste campo!</p>
                }
                   
                
                
          
                
                <div className={style.divIcon}>
                  <button onClick={() => isEditingImage === false ? (setIsEditingImage(true)) : (setIsEditingImage(false),setPreview(null)) } className={style.btnEditarPencil} type="button">
                    <Iconify
                      height={24}
                      width={24}
                      className={style.iconLapis}
                      icon="raphael:pensil"
                    />
                  </button>
                </div>
                
              </div>
            <span className={style.errorMsg}>{errors.imagem?.message}</span>
            
              <div className={style.divBtnSalvar}>
              <button type="submit" className={style.btnSalvar}>
                Salvar
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  };
let header = ""
 if(isScrolled){
           header ="header_scrolled"

        }else{
           header = "header_top"
        }
  return (
    <div className={style.load}>
      
      <header id="introducao" className={style[header]}>
        <Link to="/admin" className={style.Linkvoltar}>
          Voltar
        </Link>
        <div className={style.divHeaderDireita}>
          <button onClick={() => setIsOpenAgendamentos(true)} className={style.btnGerenciarAgendamentos}>Gerenciar Agendamentos</button>
        <p>Controle</p>
        </div>
      </header>

      <ModalInfo
        isOpen={modalInfoOpen}
        infoCampo={infoCampo}
        onClose={() => setModalInfoOpen(false)}
        atualizarCampo={atualizarCampo}
        isEditingEndereco={isEditingEndereco}
        setIsEditingEndereco={setIsEditingEndereco}
        isEditingDescricao={isEditingDescricao}
        setIsEditingDescricao={setIsEditingDescricao}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        setValue={setValue}
      />
      {isOpenEditarCampo && (
        <OpenModalEditarCampo
          onClose={() => (setIsOpenEditarCampo(false), getCampos())}
          isOpen={isOpenEditarCampo}
          campoId={campoId}
        />
      )}
      {isOpenEditarHorarios && (
        <ModalEditarHorarios
          onClose={() => setIsOpenEditarHorarios(false)}
          isOpen={isOpenEditarHorarios}
          campoId={campoId}
        />
      )}
      <div className={style.divH1}>
        <h1>Controle seus campos de futebol</h1>
      </div>

      {isOpenAddCampo && (
        <OpenModalAddCampo
          isOpen={isOpenAddCampo}
          onClose={() => (setIsOpenAddCampo(false), getCampos())}
        />
      )}

      {isOpenAgendamentos && (
        <OpenModalAgendamentos isOpen={isOpenAgendamentos}
        onClose={() => (setIsOpenAgendamentos(false), getCampos())}
        />
      )}
      <div className={style.controleDosCampos}>
        <div className={style.campos}>
         
          <h3 className={style.oqueDeseja}>O que deseja controlar?</h3>
          <div className={style.divPesquisa}> 
          
           {optionChecked === "nome" || optionChecked==='' ?
               <input
                id="idPesquisaCampo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={style.inputPesquisa}
                type="search"
                placeholder="Pesquise um campo (por nome)"
               

              />
            : <input
                id="idPesquisaCampo"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={style.inputPesquisa}
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
         
          {}
          {campos.filter((campo) =>{
                if(optionChecked === "nome"){
                  return campo.nome.toLowerCase().includes(search.toLowerCase())

                }else{
                   return String(campo.valor).includes(search)
                }
              }
                
              )
          .map((campo) => (
            <div className={style.caixaCampo} key={campo.id}>
              <div className={style.campo}>
                <div className={style.parteCimaCampo}>
                <p className={style.campoNome}>{campo.nome}</p>
                  <p className={style.campoPreco}>R${campo.valor / 100}</p>
                </div>
                <div className={style.parteBaixoCampo}>
                <div className={style.campoInformacoes}>
                  <button
                    onClick={() => clickInformacoes(campo.id)}
                    className={style.maisInformacoes}
                  >
                    Mais informações
                  </button>
                </div>
              <div className={style.icons}>
          
                {campo.status == "inativo" ? 
                
              <>
              <p>Ativo</p>
        
                <Iconify color={"green"} className={style.iconDesativar} onClick={() => atualizarStatus(campo)} icon="el:off" />
                  
              </>
                
                :
                <>
                <p>Inativo</p>
                <Iconify color={"red"} className={style.iconDesativar} onClick={() => atualizarStatus(campo)} icon="el:off" />
                </>
                }

                <Iconify
                color={"white"}
                  className={style.iconPencil}
                  onClick={() => clickEditarPencil(campo.id)}
                  icon="raphael:pensil"
                />
              </div>
              </div>
              </div>
            </div>
          ))}
        </div>
   
        <div className={style.divButtonsPaginacao}>
          {campos.length > 0 ?
          <>
        <button className={style.buttonVoltar} disabled={buttonVoltarDisabled} onClick={paginacaoDown}>Voltar</button>
        <button className={style.buttonAvancar} onClick={paginacaoUp}>Avançar</button>
          </>
      : <h2 className={style.h1Nenhum}>Nenhum campo cadastrado ainda</h2>}
        </div>
   
        <button
          onClick={() => setIsOpenAddCampo(true)}
          className={style.adicionar}
        >
          <Iconify icon="ic:sharp-add" />
          Adicionar
        </button>
      </div>

      <div className={style.footer}>
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
              <Link to={"/home"}>Home</Link>
              <Link to={"/agendar"}>Agenda</Link>
              <Link to={"/cadastro"}>Cadastro</Link>
              <Link to={"/login"}>Login</Link>
            </div>
            <a href="#introducao">Introdução</a>
            
          </div>
        </footer>
      </div>
    </div>
  );
};
