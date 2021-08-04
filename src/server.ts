import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";

import { errors } from "celebrate";

import "express-async-errors";
import { AppError } from "./utils/AppError";

import { appRouter } from "./routes";
import "./database";

const app = express();
app.use(express.json());

app.use(appRouter);
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }

    console.log(err)

    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

app.listen(3333, () => console.log("server is running"));
