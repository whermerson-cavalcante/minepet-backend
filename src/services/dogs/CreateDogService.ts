import { Dog } from "../../entities/Dog";
import { DogsRepository } from "../../repositories/dogs/DogsRepository";
import { UsersRepository } from "../../repositories/users/UsersRepository";
import { AppError } from "../../utils/AppError";

interface IRequest {
  user_id: string;
  dogname: string;
  breed: string;
  birth_date: Date;
}

export class CreateDogService {
  async execute({
    user_id,
    dogname,
    breed,
    birth_date
  }: IRequest): Promise<Dog> {
    const usersRepository = new UsersRepository();
    const dogsRepository = new DogsRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new AppError("Ivalid user", 401);
    
    const dog = await dogsRepository.create({
      dogname,
      breed,
      birth_date,
      user_id,
    });
    
    
    return dog;
  }
}
