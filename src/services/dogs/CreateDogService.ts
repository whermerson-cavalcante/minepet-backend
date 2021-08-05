import { Dog } from "../../entities/Dog";
import { DogsRepository } from "../../repositories/dogs/DogsRepository";
import { UsersRepository } from "../../repositories/users/UsersRepository";
import { AppError } from "../../utils/AppError";

interface IRequest {
  user_id: string;
  dogname: string;
  breed: string;
  birth_date: string;
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

    const formatBirthDate = new Date(birth_date);
    
    const dog = await dogsRepository.create({
      dogname,
      breed,
      birth_date: formatBirthDate,
      user_id,
    });
    
    
    return dog;
  }
}
