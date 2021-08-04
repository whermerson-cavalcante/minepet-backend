import { Request, Response } from "express";
import { classToClass } from "class-transformer";

import { CreateDogService } from "../../services/dogs/CreateDogService";

export class CreateDogController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createDogService = new CreateDogService();

    const user_id = request.user.id;
    const { dogname, breed, birth_day, birth_month, birth_year } = request.body;

    const dog = await createDogService.execute({
      user_id,
      dogname,
      breed,
      birth_day,
      birth_month,
      birth_year,
    });

    return response.status(201).json(classToClass(dog));
  }
}
