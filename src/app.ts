import "express-async-errors";
import express, { Application } from "express";
import "dotenv/config";
import { moviesRouter } from "./Routes";
import { handleErrors } from "./Middlewares";

const app: Application = express();
app.use(express.json());

app.use("/movies", moviesRouter);

app.use(handleErrors);

export default app;
