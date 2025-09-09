import { Controller, useForm } from "react-hook-form";
import type { modalProps } from "../modalsInterface/modalInterface";
import style from "./modalControleAddCampo.module.css";
import {
  createCamposSchema,
  type iCreateCampo,
} from "../../../schemas/campo.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiController } from "../../../controller/api.controller";
import CurrencyInput from "react-currency-input-field";
import { useState } from "react";
import { toast } from "react-toastify";

export const OpenModalAddCampo = ({ isOpen, onClose }: modalProps) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<iCreateCampo>({
    mode: "onBlur",
    resolver: zodResolver(createCamposSchema),
    defaultValues: {
      valor: 0,
      imagem: "",
      status: "ativo"
    },
  });

  const [preview, setPreview] = useState<string | null>(null);

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

  const adicionarCampo = async (campoData: iCreateCampo) => {
   
    
       
      const campoAdicionar = await apiController.post(`/campos`, campoData);
      if (campoAdicionar) {
        toast.success("Campo adicionado com sucesso!");
      }
      else{
        toast.error("Erro ao adicionar este campo!")
      }
    
  };

  if (!isOpen) return null;

  return <div className={style.load}>
    
    <div className={style.fundoModal}>
      <div className={style.addCampos}>
        <header className={style.headerAddCampos}>
          <div>Adicionar campo</div>
          <div>
            <button
              type="button"
              onClick={onClose}
              className={style.btnFecharModal}
            >
              X
            </button>
          </div>
        </header>
        <form
          onSubmit={handleSubmit(adicionarCampo)}
          className={style.formAddCampo}
        >
          <div className={style.divPrincipal}>
  
            <div className={style.nomeCampoAdd}>
              <h3 className={style.nomeAdd}>Nome:</h3>
              <input {...register("nome")} type="text" className={style.input} />
            </div>
            <span className={style.errorMsg}>{errors.nome?.message}</span>

            <div className={style.enderecoCampoAdd}>
              <h3 className={style.enderecoAdd}>Endereço:</h3>
              <input
                {...register("endereco")}
                type="text"
                className={style.input}
              />
            </div>
            <span className={style.errorMsg}>{errors.endereco?.message}</span>

            <div className={style.descricaoCampoAdd}>
              <h3 className={style.descricaoAdd}>Descrição:</h3>
              <input
                {...register("descricao")}
                type="text"
                className={style.input}
              />
            </div>
            <span className={style.errorMsg}>{errors.descricao?.message}</span>

            <div className={style.imagemCampoAdd}>
              <div className={style.divImagemText}>

              <h3 className={style.imagemAdd}>Imagem:</h3>
              <label className={style.labelImage} htmlFor="inputImage">Escolher uma imagem</label>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={style.inputImage}
                id="inputImage"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Pré-visualização"
                  style={{ marginTop: "10px", maxHeight: "120px" }}
                />
              )}
            </div>
            

            <div className={style.precoCampoAdd}>
              <h3 className={style.precoAdd}>Preço:</h3>
              <Controller
                name="valor"
                control={control}
                rules={{ required: "valor obrigatório" }}
                render={({ field }) => (
                  <CurrencyInput
                    placeholder="ex: 120,90"
                    decimalsLimit={2}
                    decimalSeparator=","
                    groupSeparator="."
                    prefix="R$ "
                    className={style.input}
                    defaultValue={(field.value ?? 0) / 100}
                    onValueChange={(value) => {
                      const numericValue = value
                        ? Math.round(
                            parseFloat(value.replace(",", ".")) * 100
                          )
                        : 0;
                      field.onChange(numericValue);
                    }}
                  />
                )}
              />
            </div>
            <span className={style.errorMsg}>{errors.valor?.message}</span>

            <div className={style.divBtnSalvar}>
              <button className={style.btnSalvar} type="submit">
                Salvar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
};
