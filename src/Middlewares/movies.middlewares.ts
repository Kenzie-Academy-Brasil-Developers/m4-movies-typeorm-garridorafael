import { NextFunction, Request, Response } from "express";
import { Movie } from "../entities";
import { moviesRepo } from "../repositories";
import { AppError } from "../Errors";
import { ZodTypeAny, z } from "zod";

const checkIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const foundMovie: Movie | null = await moviesRepo.findOneBy({
    id: Number(req.params.id),
  });

  if (!foundMovie) throw new AppError("Movie not found", 404);

  res.locals = { ...res.locals, foundMovie };

  return next();
};

const checkNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;

  if (name) {
    const foundMovieName: Movie | null = await moviesRepo.findOne({
      where: { name: req.body.name },
    });

    if (foundMovieName) {
      throw new AppError("Movie already exists.", 409);
    }

    res.locals = { ...res.locals, foundMovieName };
  }

  return next();
};

const validateBody =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      return next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string[] } = {};

        error.issues.forEach((issue) => {
          const fieldName = issue.path[0];
          const errorMessage = issue.message;

          if (!fieldErrors[fieldName]) {
            fieldErrors[fieldName] = [];
          }

          fieldErrors[fieldName].push(errorMessage);
        });

        res.status(400).json({ message: fieldErrors });
      }
    }
  };

export { checkIdExists, validateBody, checkNameExists };
