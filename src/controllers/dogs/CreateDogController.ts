import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import { CreateDogService } from "../../services/dogs/CreateDogService";

export class CreateDogController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createDogService = new CreateDogService();

    const user_id = request.user.id;
    const { dogname, breed } = request.body;
    const { birth_date } = request.query;

    const dog = await createDogService.execute({
      user_id,
      dogname,
      breed,
      birth_date: String(birth_date)
    });

    return response.status(201).json(classToClass(dog));
  }
}
