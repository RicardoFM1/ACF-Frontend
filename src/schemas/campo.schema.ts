import z from "zod"

export const createCamposSchema = z.object({
    nome: z.string().min(1, "Necessário preencher"),
    endereco: z.string().min(1, "Necessário preencher"),
    descricao: z.string().min(1, "Necessário preencher"),
    imagem: z.string(),
    valor: z.number().min(1, "Necessário preencher")
})


export const returnCamposSchema = z.object({
        id: z.number(),
        nome: z.string().min(1, "Necessário preencher"),
        endereco: z.string().min(1, "Necessário preencher"),
        descricao: z.string().min(1, "Necessário preencher"),
        valor: z.number().min(1, "Necessário preencher"),
        imagem: z.string(),
})

export const returnAllCamposSchema = returnCamposSchema.array() 

export type iCreateCampo = z.infer<typeof createCamposSchema>
export type iReturnCampo = z.infer<typeof returnCamposSchema>
export type iReturnAllCampos = z.infer<typeof returnAllCamposSchema>