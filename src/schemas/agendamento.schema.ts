import z from "zod"
import { returnCamposSchema } from "./campo.schema"
import { returnUsuarioSchema } from "./usuario.schema"


export const createAgendamentoSchema = z.object({
    horario: z.string().min(1, "Necessário preencher"),
    camposId: z.number().min(1, "Necessário preencher"),
    data: z.string().min(1, "Necessário preencher"),
    usuariosId: z.number().min(1, "Necessário preencher"),
    status: z.string()
})
export const returnAgendamentoSchema = z.object({
    id: z.number(),
    campos: returnCamposSchema,
    horario: z.string(),
    data: z.string(),
    usuarios: returnUsuarioSchema,
    status: z.string()
})

 
export const returnAllAgendamentosSchema = returnAgendamentoSchema.array()

export type iAgendamento = z.infer<typeof createAgendamentoSchema>
export type iReturnAgendamento = z.infer<typeof returnAgendamentoSchema>
export type iReturnAllAgendamentos = z.infer<typeof returnAllAgendamentosSchema>


