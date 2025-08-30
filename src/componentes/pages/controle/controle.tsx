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
  const [isOpenEditarCampo, setIsOpenEditarCampo] = useState(false);
  const [isOpenEditarHorarios, setIsOpenEditarHorarios] = useState(false);
  const [isOpenAddCampo, setIsOpenAddCampo] = useState(false);
  const [status, setStatus] = useState("ativo")

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
    const campos = await apiController.get("/campos");
    setCampos(campos);
  };

  const atualizarStatus = async(campoData:iCampos) => {
    
    if(status === "ativo"){
      setStatus("inativo")
    }else{
      setStatus("ativo")
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
  }, []);

  useEffect(() => {
    getCampos();
  }, [campos]);

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
      
      }
    } catch (error: any) {
      console.log(error);
      toastbar.error(
        error.response?.data?.message || "Erro ao atualizar campo"
      );
    }
    console.log("chamado");
  };

  // const desativarCampo = async(id:number) => {
  //   setCampoId(id)
  //   const campo = await apiController.patch(`/campos/${id}`, )
  // }
  const clickEditarPencil = async (id: number) => {
    setCampoId(id);
    const campo = await apiController.get(`/campos/${id}`);
    if (campo) {
      setInfoCampo(campo);
      setIsOpenEditarCampo(true);
    }
  };

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
                    <textarea {...register("endereco")} rows={6} cols={50} />
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
                    <p className={style.error}>{errors.endereco.message}</p>
                  )}
                </div>
              </div>

              <div className={style.divDescricaoCampo}>
                <h2>Descrição</h2>
                <div className={style.caixaDescricao}>
                  {isEditingDescricao ? (
                    <textarea {...register("descricao")} rows={6} cols={50} />
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
                    <p className={style.error}>{errors.descricao.message}</p>
                  )}
                </div>
              </div>

              <div className={style.contatoCampo}>
                <p>
                  Caso não tenha encontrado uma informação que deseja aqui,
                  entre em contato conosco
                </p>
              </div>
            </div>

            <div className={style.divImagensCampo}>
              <h2>Fotos do campo</h2>
              <div className={style.caixaFoto1}>
                {infoCampo.imagem && (
                  <img
                    src={`${infoCampo.imagem}`}
                    alt="Imagem do campo"
                    className={style.imagemPreview}
                  />
                )}
                <div className={style.divIcon}>
                  <button className={style.btnEditarPencil} type="button">
                    <Iconify
                      height={24}
                      width={24}
                      className={style.iconLapis}
                      icon="raphael:pensil"
                    />
                  </button>
                </div>
              </div>
              <div className={style.caixaFoto2}>
                {infoCampo.imagem && (
                  <img
                    src={`${infoCampo.imagem}`}
                    alt="Imagem do campo"
                    className={style.imagemPreview}
                  />
                )}
                <div className={style.divIcon}>
                  <button className={style.btnEditarPencil} type="button">
                    <Iconify
                      height={24}
                      width={24}
                      className={style.iconLapis}
                      icon="raphael:pensil"
                    />
                  </button>
                </div>
              </div>
              <button type="submit" className={style.btnSalvar}>
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  };

  return (
    <div className={style.load}>
      
      <header id="introducao" className={style.headerControle}>
        <Link to="/admin" className={style.Linkvoltar}>
          Voltar
        </Link>
        <p>Controle</p>
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
          onClose={() => setIsOpenEditarCampo(false)}
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
          onClose={() => setIsOpenAddCampo(false)}
        />
      )}
      <div className={style.controleDosCampos}>
        <div className={style.campos}>
          <h3>O que deseja controlar?</h3>
          {}
          {campos.map((campo) => (
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
                <Iconify color={"white"} className={style.iconDesativar} onClick={() => atualizarStatus(campo)} icon="el:off" />
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
