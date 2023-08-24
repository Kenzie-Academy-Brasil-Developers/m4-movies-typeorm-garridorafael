import {
  MovieCreate,
  MovieRead,
  MovieUpdate,
  Pagination,
  PaginationParams,
} from "../Interfaces";
import { Movie } from "../entities";
import { moviesRepo } from "../repositories";

const createMovie = async (payload: MovieCreate): Promise<Movie> => {
  return await moviesRepo.save(payload);
};

const partialUpdate = async (
  movie: Movie,
  payload: MovieUpdate
): Promise<Movie> => {
  return await moviesRepo.save({ ...movie, ...payload });
};

const remove = async (movie: Movie): Promise<void> => {
  await moviesRepo.remove(movie);
};

const getAllMovies = async ({
  nextPage,
  page,
  perPage,
  prevPage,
  order,
  sort,
}: PaginationParams): Promise<Pagination> => {
  const [movies, count]: Array<MovieRead | number> =
    await moviesRepo.findAndCount({
      order: { [sort]: order },
      skip: page,
      take: perPage,
    });

  return {
    prevPage: page <= 1 ? null : prevPage,
    nextPage: count - page <= perPage ? null : nextPage,
    count,
    data: movies,
  };
};

export default { createMovie, partialUpdate, remove, getAllMovies };
