import z from "zod"

export const createAgendamentoSchema = z.object({
    horario: z.string(),
    camposId: z.number(),
    data: z.string(),
    usuariosId: z.number()
})

export type iCreateAgendamento = z.infer<typeof createAgendamentoSchema>
