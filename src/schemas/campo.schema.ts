import z from "zod"

export const createCamposSchema = z.object({
    nome: z.string().min(1, "Necessário preencher").toLowerCase(),
    endereco: z.string().min(1, "Necessário preencher"),
    descricao: z.string().min(1, "Necessário preencher"),
    imagem: z.string(),
    valor: z.number().min(1, "Necessário preencher"),
    status: z.string()
})


export const returnCamposSchema = z.object({
        id: z.number(),
        nome: z.string().min(1, "Necessário preencher"),
        endereco: z.string().min(1, "Necessário preencher"),
        descricao: z.string().min(1, "Necessário preencher"),
        valor: z.number().min(1, "Necessário preencher"),
        imagem: z.string(),
        status: z.string()
})

export const atualizarInfoCampoSchema = z.object({
  endereco: z.string().min(1, "Necessário preencher").optional(),
  descricao: z.string().min(1, "Necessário preencher").optional(),
  imagem: z.string().optional()
});


export const atualizarNomePrecoSchema = z.object({
  nome: z.string().min(1, "Necessário preencher").optional(),
   valor: z.number().min(1, "Necessário preencher").optional()
})

export const atualizarStatusSchemas = z.object({
  status: z.string()
})

export const returnAllCamposSchema = returnCamposSchema.array() 

export type iCreateCampo = z.infer<typeof createCamposSchema>
export type iReturnCampo = z.infer<typeof returnCamposSchema>
export type iReturnAllCampos = z.infer<typeof returnAllCamposSchema>
export type iAtualizarCampos = z.infer<typeof atualizarInfoCampoSchema>
export type iAtualizarStatus = z.infer<typeof atualizarStatusSchemas>
export type iAtualizarNomePrecoCampos = z.infer<typeof atualizarNomePrecoSchema>