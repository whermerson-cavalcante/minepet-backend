import { Router } from "express";
import { Joi, celebrate, Segments } from "celebrate";

import { Auth } from '../middlewares/Auth'

import { CreateDogController } from "../controllers/dogs/CreateDogController";

export const dogRouter = Router();

const createDogController = new CreateDogController();

const auth = new Auth()

dogRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      dogname: Joi.string().required(),
      breed: Joi.string().required(),
    }),
    [Segments.QUERY]: Joi.object().keys({
      birth_date: Joi.date()
    }),
  }),
  auth.userAuth,
  createDogController.handle
);
