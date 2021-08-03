import { Router } from "express";
import { Joi, celebrate, Segments } from "celebrate";

import { CreateSessionController } from "../controllers/session/CreateSessionController";

export const sessionRouter = Router();

const createSessionController = new CreateSessionController();

sessionRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  createSessionController.handle
);
