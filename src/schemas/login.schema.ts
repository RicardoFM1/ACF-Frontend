import z from "zod"

export const createLoginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string("Senha inválida")
})

export const returnLoginSchema = createLoginSchema.extend({
    id: z.number()
})

export type iCreateLogin = z.infer<typeof createLoginSchema>
export type iReturnLogin = z.infer<typeof returnLoginSchema>