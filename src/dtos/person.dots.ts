import z from "zod"
import { personSchema } from "../types"

export const createPersonOTD = personSchema.omit({ id: true })
export type createPerson = z.infer<typeof createPersonOTD>
