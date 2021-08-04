import { Router } from "express";

import { userRouter } from "./user.routes";
import { sessionRouter } from "./session.routes";
import { dogRouter } from "./dog.routes";


const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/session", sessionRouter);
appRouter.use("/dogs", dogRouter);

export { appRouter };
