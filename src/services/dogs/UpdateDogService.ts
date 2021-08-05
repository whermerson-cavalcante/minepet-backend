import { Dog } from "../../entities/Dog";

import { UsersRepository } from "../../repositories/users/UsersRepository";
import { DogsRepository } from "../../repositories/dogs/DogsRepository";

import { AppError } from "../../utils/AppError";

interface IRequest {
  id: string;
  user_id: string;
  dogname: string;
  breed: string;
  birth_date: Date;
}

export class UpdateDogService {
  async execute({
    id,
    user_id,
    dogname,
    breed,
    birth_date,
  }: IRequest): Promise<Dog> {
    const usersRepository = new UsersRepository();
    const dogsRepository = new DogsRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new AppError("Unauthorization operation", 401);

    const dog = await dogsRepository.findById(id);
    if (!dog) throw new AppError("This dog does not exist", 404);

    dog.dogname = dogname;
    dog.breed = breed;
    dog.birth_date = birth_date;

    return dogsRepository.save(dog);
  }
}
