import z from "zod"

export const createUsuarioSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string("Necessário preencher").min(8, "Minimo 8 caractéres")
    
})

export const returnUsuarioSchema = createUsuarioSchema.extend({
    id: z.number()
})

export type iCreateUsuario = z.infer<typeof createUsuarioSchema>
export type iReturnUsuario = z.infer<typeof returnUsuarioSchema>