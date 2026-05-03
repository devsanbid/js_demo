export type Product = {
  id: number;
  name: string;
  price: number;
  category?: string;
};

import { z } from "zod"

export const personSchema = z.object({
  id: z.number(),
  name: z.string("Should be string").min(1, "Name is required"),
  age: z.number().min(1, "Age can't be lower then 1").max(100, "Age can't be higher then 100")
})

export type Person = z.infer<typeof personSchema>;

