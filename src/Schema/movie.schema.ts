import { z } from "zod";

const movieSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(50),
  description: z.string().nullable().default(null),
  duration: z.number().positive().int("Expected number, received string"),
  price: z.number().int(),
});

const movieCreateSchema = movieSchema.omit({ id: true });
const movieUpdateSchema = movieCreateSchema.partial();

export { movieSchema, movieCreateSchema, movieUpdateSchema };
