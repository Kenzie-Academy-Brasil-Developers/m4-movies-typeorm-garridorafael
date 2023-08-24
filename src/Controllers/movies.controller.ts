import { Request, Response } from "express";
import { Movie } from "../entities";
import { moviesServices } from "../Services";
import { Pagination } from "../Interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const movie: Movie = await moviesServices.createMovie(req.body);

  return res.status(201).json(movie);
};

const readAllMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { pagination } = res.locals;
  const movies: Pagination = await moviesServices.getAllMovies(pagination);

  return res.status(200).json(movies);
};

const update = async (req: Request, res: Response): Promise<Response> => {
  const { foundMovie } = res.locals;
  const { body } = req;

  const movie: Movie = await moviesServices.partialUpdate(foundMovie, body);
  return res.status(200).json(movie);
};

const remove = async (req: Request, res: Response): Promise<Response> => {
  await moviesServices.remove(res.locals.foundMovie);
  return res.status(204).json();
};

export default { create, update, remove, readAllMovies };
