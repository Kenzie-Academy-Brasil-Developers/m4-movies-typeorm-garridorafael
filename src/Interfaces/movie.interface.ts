import { z } from "zod";
import { movieCreateSchema } from "../Schema";
import { Movie } from "../entities";
import { DeepPartial, Repository } from "typeorm";

type MovieCreate = z.infer<typeof movieCreateSchema>;
type MovieRead = Array<Movie>;
type MovieUpdate = DeepPartial<Movie>;

type MoviesRepo = Repository<Movie>;

export { MovieCreate, MovieRead, MovieUpdate, MoviesRepo };
