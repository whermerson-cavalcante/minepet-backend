import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import { CreateSessionService } from "../../services/session/CreateSessionService";

export class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createSessionService = new CreateSessionService();

    const { username, password } = request.body;

    const data = await createSessionService.execute({
      username,
      password,
    });

    return response.status(201).json(classToClass(data));
  }
}
