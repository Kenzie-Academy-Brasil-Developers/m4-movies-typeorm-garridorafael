import { AppDataSource } from "./data-source";
import { Movie } from "./entities";
import { MoviesRepo } from "./Interfaces";

const moviesRepo: MoviesRepo = AppDataSource.getRepository(Movie);

export { moviesRepo };
