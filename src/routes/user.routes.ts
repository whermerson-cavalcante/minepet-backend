import { Router } from "express";
import { Joi, celebrate, Segments } from "celebrate";

import { CreateUserController } from "../controllers/users/CreateUserController";

const userRouter = Router();

const createUserController = new CreateUserController();

userRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().min(8).max(20).required(),
    }),
  }),
  createUserController.handle
);

export { userRouter };
