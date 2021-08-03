import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import { CreateUserService } from "../../services/users/CreateUserService";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      username,
      password,
    });

    return response.status(201).json(classToClass(user));
  }
}
