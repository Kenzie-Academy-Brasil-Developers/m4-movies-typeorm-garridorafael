import { Router } from "express";
import { moviesController } from "../Controllers";
import {
  checkIdExists,
  checkNameExists,
  pagination,
  validateBody,
} from "../Middlewares";
import { movieCreateSchema, movieUpdateSchema } from "../Schema";
// import { createMovie, getMovies, updateMovie, deleteMovie } from '../Controllers';

const moviesRouter = Router();

moviesRouter.post(
  "",
  checkNameExists,
  validateBody(movieCreateSchema),
  moviesController.create
);
moviesRouter.get("", pagination, moviesController.readAllMovies);
moviesRouter.patch(
  "/:id",
  checkIdExists,
  checkNameExists,
  validateBody(movieUpdateSchema),
  moviesController.update
);
moviesRouter.delete("/:id", checkIdExists, moviesController.remove);

export default moviesRouter;
