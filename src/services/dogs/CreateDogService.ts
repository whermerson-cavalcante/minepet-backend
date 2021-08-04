import { Dog } from "../../entities/Dog";
import { DogsRepository } from "../../repositories/dogs/DogsRepository";
import { UsersRepository } from "../../repositories/users/UsersRepository";
import { AppError } from "../../utils/AppError";

interface IRequest {
  user_id: string;
  dogname: string;
  breed: string;
  birth_day: number;
  birth_month: number;
  birth_year: number;
}

export class CreateDogService {
  async execute({
    user_id,
    dogname,
    breed,
    birth_day,
    birth_month,
    birth_year,
  }: IRequest): Promise<Dog> {
    const usersRepository = new UsersRepository();
    const dogsRepository = new DogsRepository();

    const user = await usersRepository.findById(user_id);
    if (!user) throw new AppError("Ivalid user", 401);

    console.log({
      dogname,
      breed,
      birth_day,
      birth_month,
      birth_year,
      user_id,
    })
    
    const dog = await dogsRepository.create({
      dogname,
      breed,
      birth_day,
      birth_month,
      birth_year,
      user_id,
    });
    
    
    return dog;
  }
}
